import { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../routes/lib/apiRequests.js";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/auth/login", {
                username,
                password
            });

            // Store token & user info
            loginUser(res.data.user, res.data.token);

            navigate("/");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Something went wrong. Please try again.");
            } else if (err.request) {
                setError("Network error. Please check your connection.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
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
                    <Link to="/register">Don't have an account? Sign up</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="Background" />
            </div>
        </div>
    );
}

export default Login;
