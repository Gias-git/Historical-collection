import aboutImg from '../../assets/ImageSlider/Middlewich_-_Roman_artefacts_-_Orange_ware_beaker.jpg';

const AboutUs = () => {
    return (
        <div className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Left Section */}
                <div>
                    <h3 className="text-[#E20935] font-medium uppercase text-sm mb-2">
                        How It Started
                    </h3>
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 ">
                        Our Dream is Global Artifacts History Collection
                    </h2>
                    <p className="text-gray-600 mt-6 leading-relaxed">
                        Kawruh was founded by Robert Anderson, a passionate lifelong learner, and Maria Sanchez, a visionary educator. Their shared dream was to create a digital haven of knowledge accessible to all. United by their belief in the transformational power of education, they embarked on a journey to build 'Kawruh.' With relentless dedication, they gathered a team of experts and launched this innovative platform, creating a global community of eager learners, all connected by the desire to explore, learn, and grow.
                    </p>
                </div>

                {/* Right Section */}
                <div className="space-y-6">
                    <div className="rounded-lg overflow-hidden flex justify-center items-center">
                        <img 
                            src={aboutImg}
                            alt="Team Working"
                            className="w-[300px] h-[300px]"
                        />
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <h3 className="text-2xl font-bold text-gray-800">3.5</h3>
                            <p className="text-gray-600">Years Experience</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <h3 className="text-2xl font-bold text-gray-800">417</h3>
                            <p className="text-gray-600">Collection</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <h3 className="text-2xl font-bold text-gray-800">830+</h3>
                            <p className="text-gray-600">Positive Reviews</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <h3 className="text-2xl font-bold text-gray-800">100K</h3>
                            <p className="text-gray-600">Trusted Customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;