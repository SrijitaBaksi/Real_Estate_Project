import React from "react";
import "./AboutUs.scss";

function AboutUs() {
  return (
    <div className="about">
      {/* Hero Section */}
      <div className="hero">
        <h1>About <br />UrbanEstate</h1>
        <p>Your trusted platform for real estate.</p>
      </div>

      {/* Who We Are Section */}
      <div className="section who-we-are">
        <div className="text">
          <h2>Who We Are</h2>
          <p>
            UrbanEstate is a modern real estate platform that connects buyers, 
            sellers, and renters with verified properties. We aim to simplify 
            property transactions and provide a seamless experience.
          </p>
        </div>
        <div className="image">
          <img src="real-estate.jpg" alt="Real Estate" />
        </div>
      </div>

      {/* Our Mission */}
      <div className="section mission">
        <h2>Our Mission</h2>
        <p>
          We strive to bring transparency and efficiency to the real estate 
          industry by leveraging technology and innovative solutions.
        </p>
      </div>

      {/* Why Choose Us? */}
      <div className="section why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <img src="verified.png" alt="Verified Properties" />
            <h3>Verified Listings</h3>
            <p>We ensure that every listing is thoroughly verified to avoid scams.</p>
          </div>
          <div className="feature">
            <img src="support.png" alt="24/7 Support" />
            <h3>24/7 Support</h3>
            <p>Our customer support team is available round the clock to assist you.</p>
          </div>
          <div className="feature">
            <img src="secure.png" alt="Secure Transactions" />
            <h3>Secure Transactions</h3>
            <p>We prioritize safety by implementing secure payment and deal mechanisms.</p>
          </div>
          <div className="feature">
            <img src="easy-search.png" alt="Easy Search" />
            <h3>Smart Search</h3>
            <p>Find properties based on location, budget, and preferences with ease.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
