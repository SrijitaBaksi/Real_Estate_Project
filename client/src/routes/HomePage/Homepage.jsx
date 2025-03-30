import React, { useContext } from 'react';
import './HomePage.scss';
import Searchbar from '../../components/searchbar/Searchbar';
import { AuthContext } from '../../context/AuthContext';
import { FaShieldAlt, FaMoneyBillWave, FaHeadset, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Footer from '../../components/footer/Footer';

function Homepage() {

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  return (
    <div className="hero">
      <div className='homePage'>
        <div className="textContainer">
          <div className="wrapper">
            <h1 className='title'>Find Real Estate & Get Your Dream Place</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam inventore sit aperiam quibusdam eos, possimus neque, nesciunt esse enim, cupiditate recusandae sint dignissimos nisi debitis dolores aut facilis quo harum!</p>
            <Searchbar />
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

      {/* Features Section */}
      <section className="featuresSection">
        <h2 className="featuresTitle">Why Choose Us?</h2>
        <div className="featuresContainer">
          <div className="featureCard">
            <FaShieldAlt />
            <h3>Verified Listings</h3>
            <p>All properties are thoroughly verified to ensure authenticity and security.</p>
          </div>
          <div className="featureCard">
            <FaMoneyBillWave />
            <h3>Affordable Pricing</h3>
            <p>Find properties that match your budget with the best deals available.</p>
          </div>
          <div className="featureCard">
            <FaHeadset />
            <h3>24/7 Customer Support</h3>
            <p>Our team is available around the clock to assist you in your journey.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonialSection">
        <h2 className="testimonialTitle">What Our Clients Say</h2>
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="testimonialSwiper"
        >
          <SwiperSlide className="testimonialCard">
            <FaQuoteLeft className="quoteIcon"/>
            <p>"Absolutely amazing service! I found my dream home in just a week."</p>
            <h3>- Emily Johnson</h3>
          </SwiperSlide>

          <SwiperSlide className="testimonialCard">
            <FaQuoteLeft className="quoteIcon"/>
            <p>"The process was smooth, and the team was very professional. Highly recommend!"</p>
            <h3>- Michael Smith</h3>
          </SwiperSlide>

          <SwiperSlide className="testimonialCard">
            <FaQuoteLeft className="quoteIcon"/>
            <p>"Best real estate platform! Super easy to use and very reliable."</p>
            <h3>- Sarah Williams</h3>
          </SwiperSlide>
        </Swiper>
      </section>
      <Footer/>
    </div>
  );
}

export default Homepage;
