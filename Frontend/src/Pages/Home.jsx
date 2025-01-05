import React  from 'react'

import  NavbarC  from "../Components/NavbarC.jsx";
import  Imagesslide  from "../Components/Imagesslide.jsx";
import  SearchbarC  from "../Components/searchbarC.jsx";
import  CategoryC  from "../Components/Category.jsx";
import  Listening  from "../Components/Listening.jsx";
import  FooterC  from "../Components/FooterC.jsx";



function Home() {

  return (
    <>  
    <NavbarC/>
    <Imagesslide/>
    <SearchbarC/>
    <CategoryC/>
    <Listening/>
    <FooterC/>
    </>
  )
}

export default Home
