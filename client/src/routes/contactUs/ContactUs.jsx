import React from "react";
import "./ContactUs.scss";

function ContactUs() {
  return (
    <div className="contact">
      {/* Hero Section */}
      <div className="hero">
        <h1>Contact Us</h1>
        <p>We are here to help you. Get in touch with us today!</p>
      </div>

      {/* Contact Information */}
      <div className="section contact-info">
        <h2>Our Contact Details</h2>
        <div className="info-grid">
          <div className="info-box">
            <img src="location.png" alt="Location" />
            <h3>Our Office</h3>
            <p>123, MG Road, Bengaluru, India</p>
          </div>
          <div className="info-box">
            <img src="phone.png" alt="Phone" />
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="info-box">
            <img src="email.png" alt="Email" />
            <h3>Email Us</h3>
            <p>support@urbanestate.com</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="section contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Google Maps Embed */}
      <div className="section map">
        <h2>Find Us Here</h2>
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.48484209983!2d77.56483945!3d12.9715985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167d5f3d36d3%3A0x4cbd3d5e3e1f30e2!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1643517622734!5m2!1sen!2sin"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
