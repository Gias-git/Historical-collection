import React from 'react'
import LazyLoad from 'react-lazyload';
import Slider from '../../Componets/Slider/Slider'
import FeaturedArtifacts from '../../Componets/FeaturedArtifacts/FeaturedArtifacts'
import ImageSlider from '../../Componets/ImageSlider/ImageSlider'
import SuccessSection from '../../Componets/SuccessSection/SuccessSection'

const Home = () => {
  return (
    <div>

      <LazyLoad debounce={5000} once  height={600}>
        <Slider></Slider>

        <FeaturedArtifacts></FeaturedArtifacts>

        <SuccessSection></SuccessSection>

        <ImageSlider></ImageSlider >
      </LazyLoad>


    </div>
  )
}

export default Home
