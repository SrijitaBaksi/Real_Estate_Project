import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext to get currentUser
import "./Card.scss";

function Card({ item }) {
  const { currentUser } = useContext(AuthContext); // Get logged-in user details

  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imageContainer'>
      <img src={item.images?.[0] || "/placeholder.png"} alt={item.title} />
      </Link>  
      <div className="textContainer">
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className='address'>
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className='price'>$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            {currentUser?.id !== item.userId && (
              <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            )}
            {/* Show chat icon only if post is NOT created by the current user */}
            {currentUser?.id !== item.userId && (
              <div className="icon">
                <img src="/chat.png" alt="Chat" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
