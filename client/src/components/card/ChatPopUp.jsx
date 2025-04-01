import React, { useState } from "react";
import apiRequest from "../../routes/lib/apiRequests.js";
import "./ChatPopUp.scss";

function ChatPopup({ onClose, receiverId, existingChat }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
        let chatId = existingChat?.id;

        if (!chatId) {
            // Create new chat if it doesn't exist
            const chatResponse = await apiRequest.post("/chats", { receiverId });
            chatId = chatResponse.data.id; // Get the new chat ID
        }

        // Send the message to the chat
        await apiRequest.post(`/messages/${chatId}`, { text: message });

        // Close the chat popup after sending
        onClose();
    } catch (error) {
        console.error("Error sending message:", error);
    }
};
  return (
    <div className="chatPopup">
      <div className="chatBox">
        <h3>Send Message to Admin</h3>
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="chatActions">
          <button className="sendButton" onClick={sendMessage}>
            Send
          </button>
          <button className="closeButton" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPopup;
