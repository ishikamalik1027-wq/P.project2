import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //lOGIN FUNCTION
  const login = async () => {

    // validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
    
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // DEBUG (IMPORTANT)
      console.log("LOGIN RESPONSE:", res.data);

    
      if (!res.data.token) {
        alert("Token not received from backend ❌");
        return;
      }

      // TOKEN SAVE
      localStorage.setItem("token", res.data.token);

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      alert("Login successful ✅");

      // REDIRECT
      navigate("/dashboard");

    } catch (err) {

      console.log("LOGIN ERROR:", err.response?.data || err.message);

      alert(
        err.response?.data?.msg || "Login failed ❌"
      );
    }

  };

  return (

    <div className="p-6 flex flex-col items-center">

      <h2 className="text-2xl font-bold mb-4">
        Login
      </h2>

      <div className="w-80 space-y-3">

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;
