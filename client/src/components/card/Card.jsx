import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../routes/lib/apiRequests.js";
import ChatPopup from "./ChatPopUp.jsx"; // Import the ChatPopup component
import "./Card.scss";

function Card({ item }) {
  const { currentUser } = useContext(AuthContext);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [existingChat, setExistingChat] = useState(null);

  const handleChatClick = async () => {
    if (!currentUser) {
      alert("You need to login to start a chat.");
      return;
    }

    try {
      // Check if a chat already exists
      const response = await apiRequest.get(`/chats`);
      const chats = response.data;
      const chatWithAdmin = chats.find((chat) =>
        chat.userIDs.includes(item.userId) // Assuming item.userId is the admin
      );

      if (chatWithAdmin) {
        setExistingChat(chatWithAdmin); // Use existing chat
      } else {
        setExistingChat(null); // No existing chat
      }
      setShowChatPopup(true); // Show the chat popup
    } catch (error) {
      console.error("Error checking chats:", error);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images?.[0] || "/placeholder.png"} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
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
            {currentUser?.id === item.userId ? (
              <Link to={`/update/${item.id}`}>
                <button className="updateButton">Update Post</button>
              </Link>
            ) : (
              <div className="icon" onClick={handleChatClick}>
                <img src="/chat.png" alt="Chat" />
              </div>
            )}
          </div>
        </div>
      </div>

      {showChatPopup && (
        <ChatPopup
          onClose={() => setShowChatPopup(false)}
          receiverId={item.userId}
          existingChat={existingChat}
        />
      )}
    </div>
  );
}

export default Card;
