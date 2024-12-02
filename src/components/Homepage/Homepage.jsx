import HeroSection from '@/app/components/Homepage/Hero'
import React from 'react'

import TopDestinations from './TopDestinations'
import TourCard from '../Tour/TourCard'




const Homepage = () => {
  return (
    <div>
        <HeroSection/>

       <TopDestinations/>

        <div className='py-10'>
            <TourCard/>
        </div>
       
     
    </div>
  )
}

export default Homepage