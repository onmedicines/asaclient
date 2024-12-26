import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FacultyLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log("Invalid");
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/faculty/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      navigate("/faculty/dashboard");
      // reset
      setRoll("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center py-8 rounded-md bg-white w-full max-w-lg">
      {error && <p className="text-center fixed right-4 bottom-4 rounded-sm w-fit bg-red-500 p-4 text-white">{error}</p>}
      <h1 className="text-3xl font-bold text-center text-sky-600">Faculty Login</h1>
      <p className="text-sm">Please enter your details</p>
      <form onSubmit={handleSubmit} autoComplete="off" className="w-full flex flex-col gap-8 px-8 py-8 mt-4">
        <label htmlFor="username" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
          <input type="text" name="username" id="username" className="bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Username" onChange={handleChange} value={username} />
          <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Username</span>
        </label>
        <label htmlFor="password" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
          <input type="text" name="password" id="password" className="bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Password" onChange={handleChange} value={password} />
          <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Password</span>
        </label>
        <button type="submit" className="w-full bg-sky-600 py-2 text-zinc-200 font-bold focus:outline-transparent focus:ring-4 focus:ring-sky-300 rounded-sm">
          Login
        </button>
      </form>
    </div>
  );
}
