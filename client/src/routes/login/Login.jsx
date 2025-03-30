import { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequests";
import { AuthContext } from "../../context/AuthContext";
function Login() {
  const [error,setError]=useState("")
  const [isLoading,setIsLoading] = useState(false)

  const {updateUser} = useContext(AuthContext)//using update user from the context 

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try{
      const res = await apiRequest.post("/auth/login",{
        username,password
      })
      
      updateUser(res.data)// to update the local storage using the update user in the context api
      navigate("/")
  
    }catch(err){
      // Handle different error cases
    if (err.response) {
      setError(err.response.data.message || "Something went wrong. Please try again.");
    } else if (err.request) {
      setError("Network error. Please check your connection.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">Don't you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;