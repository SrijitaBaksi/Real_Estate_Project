import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./ProfileUpdatePage.scss";
import apiRequest from "../lib/apiRequests";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const [error,setError]= useState("")
  const navigate = useNavigate()
  const {currentUser,updateUser} = useContext(AuthContext)
  const [avatar,setAvatar]= useState([])

  const handleSubmit= async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)

    const {username,email,password} = Object.fromEntries(formData)// this can fetch all in one line instead of doing formData.get("password") like that to do things in one line itself

    try{
      const res = await apiRequest.put(`/users/${currentUser.id}`,{
        username,
        email,
        password,
        avatar:avatar[0],
      })
      
      updateUser(res.data)
      navigate("/profile")

    }catch(err){
      console.log(err)
      setError(err.response.data.message)
    }

  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          {error && <span>error</span>}
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
       <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="Avatar" className="avatar" />
        {console.log(currentUser.avatar)}
        {console.log(avatar[0])}
        <UploadWidget  uwConfig={{
          cloudName:"ddshknlea",
          uploadPreset: "estate",
          multiple:false,
          maxImageFileSize:2000000,
          folder:"avatars",
        }}

        setState={(uploadedUrl) => setAvatar(uploadedUrl)}
        />
          {console.log(currentUser.avatar)}
          {console.log(avatar[0])}
        
      </div>
    </div>
  );
}

export default ProfileUpdatePage;