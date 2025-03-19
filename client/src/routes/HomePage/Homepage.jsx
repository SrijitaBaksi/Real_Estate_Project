import React, { useContext } from 'react'
import './HomePage.scss'
import Searchbar from '../../components/searchbar/Searchbar'
import { AuthContext } from '../../context/AuthContext'
function Homepage() {

  const {currentUser}= useContext(AuthContext)

  console.log(currentUser)
  return (
    <div className='homePage'>
      <div className="textContainer">
        <div className="wrapper">
         <h1 className='title'>Find Real Estate & Get Your Dream Place</h1>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam inventore sit aperiam quibusdam eos, possimus neque, nesciunt esse enim, cupiditate recusandae sint dignissimos nisi debitis dolores aut facilis quo harum!
         </p>
         <Searchbar/>
         <div className="boxes">
          <div className="box">
            <h1>16+</h1>
            <h2>Years of Experience</h2>
          </div>
          <div className="box">
            <h1>200</h1>
            <h2>Award gained</h2>
          </div>
          <div className="box">
            <h1>2000+</h1>
            <h2>Property Ready</h2>
          </div>
         </div>

        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
        
    </div>

  )
}

export default Homepage