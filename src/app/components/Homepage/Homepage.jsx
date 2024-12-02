import HeroSection from '@/app/components/Homepage/Hero'
import React from 'react'

import TopDestinations from '../../../components/Homepage/TopDestinations'
import TourCard from '../../../components/Tour/TourCard'




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