import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../supabaseClient";

const Register = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        if (!inputs.email || !inputs.password) {
            setError("All fields are required.");
            return;
        }
    
        try {
            const { user, error: signUpError } = await supabase.auth.signUp({
                email: inputs.email,
                password: inputs.password,
            });
    
            if (signUpError) throw signUpError;
    
            await supabase
                .from('profiles')
                .insert([{ username: inputs.username }]);
    
            navigate("/login");
        } catch (err) {
            console.error("Error during registration:", err.message);
    
            if (err.message.includes("Invalid email")) {
                setError("Invalid email format");
            } else if (err.message.includes("Password")) {
                setError("Password does not meet requirements");
            } else if (err.message.includes("Email already registered")) {
                setError("Email already in use"); 
            } else {
                setError(err.message || "An error occurred during registration");
            }
        }
    };
    

    return (
        <div className="auth">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
                {err && <p>{err}</p>}
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;
