require('dotenv').config()
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const { count } = require('console');
const app = express()
const cookieParser = require('cookie-parser');
const { decode } = require('punycode');
const port = process.env.PORT || 5000;




app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173','https://historical-artifacts-client.web.app','https://historical-artifacts-client.firebaseapp.com'],
    credentials: true,
    optionalSuccessStatus: 200,
}));

app.use(cookieParser())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zysi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {

        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



// varify token

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) return res.status(401).send({ message: 'unauthorized access' })
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'unauthorized access' })
      }
      req.user = decoded
    })
  
    next()
  }


async function run() {
    try {
        // Add a New Artifact

        const artifactDB = client.db("artifactDB");
        const artifactsCollection = artifactDB.collection("artifactsCollection");
        const likedCollection = artifactDB.collection("likedCollection")


        app.post('/logout', async (req, res) => {
            res.clearCookie('token', {
                maxAge: 0,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            }).send({ success: true })
        })


        // generate TOken 
        app.post('/jwt', async (req, res) => {
            const UserEmail = req.body
            // generate token
            const token = jwt.sign(UserEmail, process.env.SECRET_KEY, {
                expiresIn: '365d',
            })
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            }).send({ success: true })
        })


        app.get('/addArtifactJwtCheck', verifyToken, async(req, res) => {
            res.send('response')
        })

        app.post('/addArtifact', async (req, res) => {
            const data = req.body
            console.log(data)
            const result = await artifactsCollection.insertOne(data)
            res.send(result)
        })


        // get all data from ArtifactCollection

        app.get('/artifactCollection', async (req, res) => {
            const searchParams = req.query.searchParms


            let option = {}
            if (searchParams) {
                option = {
                    artifactName: {
                        $regex: searchParams,
                        $options: 'i',
                    },
                }
            }




            const result = await artifactsCollection.find(option).toArray()
            res.send(result)
        })

        // get artifact limited collection

        app.get('/artifactLimitCollection', async (req, res) => {

            const result = await artifactsCollection.find().sort({ count: -1 }).limit(6).toArray()
            res.send(result)
        })


        // artifacts Details 
        app.get('/artifactDetail/:id', verifyToken, async (req, res) => {
            const id = req.params.id
            console.log(id)
            const query = { _id: new ObjectId(id) }
            const result = await artifactsCollection.findOne(query)
            res.send(result)
        })


        // add liked data on database 


        app.post('/artifactLike', async (req, res) => {
            const likedData = req.body;
            const id = likedData.artifactId;

            const query = {
                userEmail: likedData.userEmail,
                artifactId: likedData.artifactId
            };

            const artiFactQuery = { _id: new ObjectId(id) };

            try {
                const filterArtfacts = await artifactsCollection.findOne(artiFactQuery);
                if (!filterArtfacts) {
                    return res.status(404).send({ error: 'Artifact not found' });
                }

                const existCheckInLikedDb = await likedCollection.findOne(query);

                if (!existCheckInLikedDb) {
                    // Increment artifact like count
                    const updateCountNumber = { $inc: { count: +1 } };
                    const updateCount = await artifactsCollection.updateOne(artiFactQuery, updateCountNumber);

                    // Add to liked collection
                    const result = await likedCollection.insertOne(likedData);
                    return res.send({ result, updateCount });
                } else {
                    // Increment artifact like count
                    const updateCountNumber = { $inc: { count: +1 } };
                    const updateCount = await artifactsCollection.updateOne(artiFactQuery, updateCountNumber);
                    // Update like status
                    const updateLikeStatus = { $set: { like: true } };
                    const updateStatus = await likedCollection.updateOne(query, updateLikeStatus);
                    res.send({ updateStatus, updateCount });
                }
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        });



        // dislike count 
        app.patch('/artifactDisLike', async (req, res) => {
            const dislikedData = req.body;
            const id = dislikedData.artifactId;

            const artiFactQuery = { _id: new ObjectId(id) };
            const query = {
                userEmail: dislikedData.userEmail,
                artifactId: dislikedData.artifactId
            };

            try {
                const filterArtfacts = await artifactsCollection.findOne(artiFactQuery);
                if (!filterArtfacts) {
                    return res.status(404).send({ error: 'Artifact not found' });
                }

                const likedDb = await likedCollection.findOne(query);
                if (!likedDb) {
                    return res.status(404).send({ error: 'Liked data not found' });
                }

                // Decrement artifact like count
                const updateCountNumber = { $inc: { count: -1 } };
                const updateCount = await artifactsCollection.updateOne(artiFactQuery, updateCountNumber);

                // Update like status
                const updateLikeStatus = { $set: { like: false } };
                const updateStatus = await likedCollection.updateOne(query, updateLikeStatus);

                res.send({ updateStatus, updateCount });
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        });

        // liked checked

        app.get('/artifactsLikeCheck', async (req, res) => {
            const { id, userEmail } = req.query;
            const findInDb = {
                userEmail: userEmail,
                artifactId: id
            }
            const result = await likedCollection.findOne(findInDb)
            if (result) res.send(result)

        })



        // artifacts load by email

        app.get('/artifacts/:email', verifyToken, async (req, res) => {
            const email = req.params.email
            const query = {
                userEmail: email
            }
            const result = await artifactsCollection.find(query).toArray()
            res.send(result)
        })

        // delete an artifact
        app.delete('/artifacts/:id', async (req, res) => {

            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const result = await artifactsCollection.deleteOne(query)
            res.send(result)
        })

        app.patch('/updateArtifacts/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const artifactData = req.body

            const updateDoc = {
                $set: {
                    artifactName: artifactData.artifactName,
                    validURL: artifactData.validURL,
                    artifactType: artifactData.artifactType,
                    historicalContext: artifactData.historicalContext,
                    createdAT: artifactData.createdAT,
                    discoveredAt: artifactData.discoveredAt,
                    discoveredBy: artifactData.discoveredBy,
                    presentLocation: artifactData.presentLocation,
                }
            }

            const result = await artifactsCollection.updateOne(query, updateDoc);
            res.send(result)
        })


        // liked data get from db for my liked page

        app.get('/myLikedData/:email', verifyToken, async (req, res) => {

            const email = req.params.email
            const LikedQuery = {
                userEmail: email,
                like: true
            }
            const likedResults = await likedCollection.find(LikedQuery).toArray()


            const allLikeData = await Promise.all(
                likedResults.map(async (likeResult) => {
                    const artifactQueryForLiked = {
                        _id: new ObjectId(likeResult.artifactId),
                    };
                    return artifactsCollection.findOne(artifactQueryForLiked);
                })
            );

            const likedExistData = allLikeData.filter(data => data !== null)
            res.send(likedExistData)


        })





        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('hello12323')
})

app.listen(port, () => {
    console.log(`port is running on ${port}`)
})