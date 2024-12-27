import React, { useContext, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";

export default function AddFaculty() {
  const { setIsLoading, setError, setSuccess } = useContext(LoadingContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        setError("Invalid input");
        console.log("Invalid input");
        break;
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!name || !username || !password || !confirmPassword) throw new Error("One or more fields missing");
      if (password !== confirmPassword) throw new Error("Password and Confirm Password should match");

      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addFaculty`, {
        method: "post",
        headers: {
          Authorization: `BEARER ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });
      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) throw new Error(data.message);
      setSuccess(data.message);
      setError("");

      // reset
      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="flex flex-col items-center py-8 md:px-8 rounded-md bg-white w-full max-w-lg ring">
        <h1 className="text-center font-bold text-2xl text-sky-600 mb-4">Add New Faculty</h1>
        <form onSubmit={handleSubmit} autoComplete="off" className="w-full flex flex-col gap-8 px-8 py-8">
          <label htmlFor="name" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
            <input type="text" name="name" id="name" className="bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Name" onChange={handleChange} value={name} />
            <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Name</span>
          </label>
          <label htmlFor="username" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
            <input type="text" name="username" id="username" className="bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Username" onChange={handleChange} value={username} />
            <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Username</span>
          </label>
          <label htmlFor="password" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
            <input type="text" name="password" id="password" className="bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Password" onChange={handleChange} value={password} />
            <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Password</span>
          </label>
          <label htmlFor="confirmPassword" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
            <input type="text" name="confirmPassword" id="confirmPassword" className="bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Confirm Password" onChange={handleChange} value={confirmPassword} />
            <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Confirm Password</span>
          </label>
          <button type="submit" className="bg-sky-600 text-white py-2">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
