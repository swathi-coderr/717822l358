// src/components/Authenticate.jsx
import { useState } from "react";
import axios from "axios";

const Authenticate = () => {
  const [token, setToken] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://20.244.56.144/test/auth", {
        clientID: "your-client-id",
        clientSecret: "your-client-secret",
      });

      const accessToken = response.data.access_token;
      setToken(accessToken);
      localStorage.setItem("token", accessToken); // Store token
      console.log("Token:", accessToken);
    } catch (error) {
      console.error("Authentication failed!", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Authenticate</button>
      {token && <p>Authenticated!</p>}
    </div>
  );
};

export default Authenticate;
