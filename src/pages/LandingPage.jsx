import React from 'react'
import Hero from '../components/landing/Hero'
import Trending from '../components/landing/Trending';
import Tags from '../components/landing/Tags';
import AboutReadian from '../components/landing/AboutReadian';
import Subscribe from '../components/landing/Subscribe';
import Help from '../components/landing/Help';


const LandingPage = ({signedIn, currentUser}) => {

  const dashboardPath = currentUser?.role === "admin" ? "/admindash" : "/authordash/works";


  return (
    <div>
        <Hero signedIn={signedIn} dashboardPath={dashboardPath}/>
        <Trending />
        <Tags />
        <AboutReadian />
        <Subscribe signedIn={signedIn} />
        <Help />
    </div>
  )
}

export default LandingPage;
