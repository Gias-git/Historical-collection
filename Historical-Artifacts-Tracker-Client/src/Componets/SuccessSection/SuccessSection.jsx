import React from 'react';
import CountUp from 'react-countup';

const SuccessSection = () => {
    return (
        <div className='md:py-16 py-10 bg-primaryColor '>



            <div className='grid xl:grid-cols-4  md:grid-cols-2 grid-cols-1 w-10/12 mx-auto px-5 py-4 rounded-lg gap-8'>
                <div className='bg-tertiaryColor dark:bg-slate-400  flex flex-col justify-center items-center gap-5 p-8'>
                    <CountUp
                        
                        end={100}
                        delay={0} 
                        duration={8}
                        decimal=","
                        suffix="+ "
                    >
                        {({ countUpRef }) => (
                            <div>
                                <span className='text-4xl font-bold text-[#303233] ' ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>

                    <h1 className='text-2xl text-center text-primaryColor dark:text-yellow-300 font-medium'>Exhibitions
                    Has Been Held</h1>
                </div>

                <div className='bg-tertiaryColor dark:bg-slate-400  flex flex-col justify-center items-center gap-5 p-8'>
                    <CountUp
                        
                        end={300}
                        delay={0} 
                        duration={8}
                        decimal=","
                        suffix="+ "
                    >
                        {({ countUpRef }) => (
                            <div>
                                <span className='text-4xl font-bold text-[#303233] ' ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>

                    <h1 className='text-2xl text-center text-primaryColor dark:text-yellow-300 font-medium'>Visitors
                    In Last Year</h1>
                </div>

                <div className='bg-tertiaryColor dark:bg-slate-400  flex flex-col justify-center items-center gap-5 p-8'>
                    <CountUp
                        
                        end={500}
                        delay={0} 
                        duration={8}
                        decimal=","
                        suffix="+ "
                    >
                        {({ countUpRef }) => (
                            <div>
                                <span className='text-4xl font-bold text-[#303233] ' ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>

                    <h1 className='text-2xl text-center text-primaryColor dark:text-yellow-300 font-medium'>Awards
                    Have Received</h1>
                </div>

                <div className='bg-tertiaryColor dark:bg-slate-400  flex flex-col justify-center items-center gap-5 p-8'>
                    <CountUp
                        
                        end={700}
                        delay={0} 
                        duration={8}
                        decimal=","
                        suffix="+ "
                    >
                        {({ countUpRef }) => (
                            <div>
                                <span className='text-4xl font-bold text-[#303233] ' ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>

                    <h1 className='text-2xl text-center text-primaryColor dark:text-yellow-300 font-medium'>Collections
                    Of Art & Designs</h1>
                </div>


            
            </div>



        </div>
    );
};

export default SuccessSection;