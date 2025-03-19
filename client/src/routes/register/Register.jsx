import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../lib/apiRequests";

function Register() {

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username, email, password
      });
      if (res) {
        navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" required placeholder="Username" />
          <input name="email" type="text" required placeholder="Email" />
          <input name="password" type="password" required placeholder="Password" autocomplete="current-password" />
          <button disabled={isLoading} type="submit">Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="background" />
      </div>
    </div>
  );
}

export default Register;
