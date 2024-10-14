import { createContext, useEffect, useState } from "react";
import { supabase }  from "../supabaseClient";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const { email, password } = inputs;
  
    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (authError) {
        console.error("Authentication error:", authError.message);
        return; 
      }
  
      setCurrentUser(user);
      console.log("Logged in user:", user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };
  
  

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
