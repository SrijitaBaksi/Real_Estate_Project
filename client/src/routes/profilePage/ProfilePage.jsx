import React, { Suspense, useContext } from 'react';
import "./ProfilePage.scss";
import List from '../../components/list/List';
import Chat from '../../components/chat/Chat';
import apiRequest from '../lib/apiRequests';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ProfilePage() {
  const data = useLoaderData();
  console.log(data)
  const { logoutUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("auth/logout");
      logoutUser();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
             <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/noavatar.jpg"} // Safe optional chaining
                alt="User Avatar"
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
            <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading posts...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => <List posts={postResponse.data.userPosts}/>
                
              }
            </Await>
          </Suspense>
         
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading posts...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => <List posts={postResponse.data.savedPosts}/>
                
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading posts...</p>}>
            <Await resolve={data.chatResponse} errorElement={<p>Error loading chats!</p>}>
              {(chatResponse) => <Chat chats={chatResponse.data}/>}
            </Await>
          </Suspense>
          
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
