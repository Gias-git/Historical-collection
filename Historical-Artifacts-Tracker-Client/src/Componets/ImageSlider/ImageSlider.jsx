import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import imgSlider1 from '../../assets/ImageSlider/barakatgallery-early-bronze-age-terracotta-pitcher-with-human-face-3000-bce-2000-bce.jpg';
import imgSlider2 from '../../assets/ImageSlider/Middlewich_-_Roman_artefacts_-_Orange_ware_beaker.jpg';
import imgSlider3 from '../../assets/ImageSlider/Mycenaean_stirrup_vase_Louvre_AO19201.jpg';
import imgSlider4 from '../../assets/ImageSlider/19met-yemen-01-bpzm-articleLarge.webp';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ImageSlider = () => {
    return (

        <div className='bg-tertiaryColor py-32'>
            <div className='w-10/12 mx-auto '>
                <div>
                    <h1 className='text-center text-4xl mb-10'>Recent Discovered</h1>
                </div>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                      
                        320: { // Small screens (mobile)
                            slidesPerView: 1,
                            
                        },
                        640: { // Medium screens (e.g., tablets)
                            slidesPerView: 2,
                        
                        },
                        1024: { // Large screens (default)
                            slidesPerView: 3,
                        },
                    }}
                >
                    <SwiperSlide>
                        <img className='w-[400px] h-[300px] lg:h-[250px] xl:wh-[300px]' src={imgSlider1} alt="" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img className='w-[400px] h-[300px] lg:h-[250px] xl:wh-[300px]' src={imgSlider2} alt="" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img className='w-[400px] h-[300px] lg:h-[250px]' src={imgSlider3} alt="" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img className='w-[400px] h-[300px] lg:h-[250px] xl:wh-[300px]' src={imgSlider4} alt="" />
                    </SwiperSlide>


                    <SwiperSlide>
                        <img className='w-[400px] h-[300px] lg:h-[250px] xl:wh-[300px]' src={imgSlider1} alt="" />
                    </SwiperSlide>


                    <SwiperSlide>
                        <img className='w-[400px] h-[300px] lg:h-[250px] xl:wh-[300px]' src={imgSlider1} alt="" />
                    </SwiperSlide>




                </Swiper>

            </div>
        </div>


    );
};

export default ImageSlider;