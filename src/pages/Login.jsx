import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { supabase }  from "../supabaseClient";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",  // Changed to email
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Ensure this context handles Supabase login

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      <input
        required
        type="email"
        placeholder="Email"
        name="email"  // name attribute matches inputs key
        onChange={handleChange}
      />
      <input
        required
        type="password"
        placeholder="Password"
        name="password"  // name attribute matches inputs key
        onChange={handleChange}
      />
        <button type="submit">Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
