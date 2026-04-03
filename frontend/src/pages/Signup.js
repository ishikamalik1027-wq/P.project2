import { useState } from "react";
import api from "../axiosConfig";

import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await api.post("/auth/signup", {
        name,
        email,
        password
      });

      console.log("SIGNUP RESPONSE:", res.data);

      alert("Signup successful ✅");

      navigate("/");

    } catch (err) {
      console.log("SIGNUP ERROR:", err.response?.data || err.message);
      alert("Signup failed ❌");
    }

  };

  return (

    <div className="p-6 flex flex-col items-center">

      <h2 className="text-2xl font-bold mb-4">
        Signup
      </h2>

      <div className="w-80 space-y-3">

        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Signup
        </button>

      </div>

    </div>

  );
}

export default Signup;
