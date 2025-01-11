import React, { useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import slider1 from '../../assets/Sliders/slider1.jpg';
import sliderMobile1 from '../../assets/Sliders/slidemobile-02.jpg';
import sliderMobile2 from '../../assets/Sliders/slider2mobile-02.jpg';
import slider2 from '../../assets/Sliders/slider2-01.jpg';
import sliderMobile3 from '../../assets/Sliders/silder-3-mobile-02.jpg';
import slider3 from '../../assets/Sliders/slider3-01.jpg';

// Import Swiper styles
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import { BiArrowBack, BiArrowFromRight, BiLeftArrowCircle } from 'react-icons/bi';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';


const Slider = () => {
    const swiper = useSwiper();
    const swiperRef = useRef(null);
    return (
        <div className='relative'>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                loop={true}
               
                pagination={{ clickable: true }}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                <SwiperSlide>
                    <div>
                        <img className='hidden md:block' src={slider1} alt="" />
                        <img className='md:hidden' src={sliderMobile1} alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div>
                    <img className='hidden md:block' src={slider2} alt="" />
                    <img className='md:hidden' src={sliderMobile2} alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div>
                    <img className='hidden md:block' src={slider3} alt="" />
                    <img className='md:hidden' src={sliderMobile3} alt="" />
                    </div>

                </SwiperSlide>

                <div className='absolute bottom-2 left-5 xl:bottom-14 z-10 lg:left-20  bg-white/30 backdrop-blur-md rounded-md py-1 px-2 md:px-4 md:py-3 md:space-x-5 space-x-3 '>

                    <button className='lg:text-5xl md:text-2xl text-xl text-primaryColor' onClick={() => swiperRef.current?.slidePrev()}> <FaArrowAltCircleLeft /> </button>
                    <button className='lg:text-5xl md:text-2xl text-xl text-primaryColor' onClick={() => swiperRef.current?.slideNext()}> <FaArrowAltCircleRight /></button>
                </div>
            </Swiper>
        </div>
    );
};

export default Slider;