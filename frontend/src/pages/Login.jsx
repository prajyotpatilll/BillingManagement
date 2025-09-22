import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Save JWT token
        localStorage.setItem("username", response.data.admin.username);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  return (
    <div>
      <div>
        <p>Welcome Back</p>
        <p>Login to your cafe's billing system</p>
        <form onSubmit={onsubmitHandler}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            placeholder="Password"
            required
            type="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
