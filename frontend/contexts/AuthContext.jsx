import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // wait for session check
    useEffect(() => {
        try {
          axios.get(`${import.meta.env.VITE_API_URL}/api/v1/session`)
            .then(res => {
              setUser(res.data?.user)
            })
            .catch(()=> {
                setUser(null)
            })
            .finally(() => {
                setLoading(false)
            })
            
        } catch (error) {
          console.error("Error fetching data:", error); 
        }
    
    
      }, [loading])
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
