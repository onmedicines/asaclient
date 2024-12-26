import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [rollNumber, setRoll] = useState("");
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "rollNumber":
        setRoll(value);
        break;
      case "name":
        setName(value);
        break;
      case "semester":
        setSemester(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "checkPassword":
        setCheckPassword(value);
        break;
      default:
        console.log("Invalid");
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (!rollNumber || !name || !semester || !password || !checkPassword) throw new Error("One or more fields missing");
      if (password !== checkPassword) throw new Error("Password and confirm password do not match");

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/student/register`, {
        method: "POST",
        body: JSON.stringify({ rollNumber, name, semester, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      navigate("/student/dashboard");
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
      <h1 className="text-3xl font-bold text-center text-sky-600">Student Login</h1>
      <p className="text-sm">Please enter your details</p>
      <form onSubmit={handleSubmit} autoComplete="off" className="w-full flex flex-col gap-8 px-8 py-8 mt-4">
        <label htmlFor="rollNumber" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
          <input type="number" name="rollNumber" id="rollNumber" className="font-semibold bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Roll Number" onChange={handleChange} value={rollNumber} />
          <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Roll Number</span>
        </label>
        <label htmlFor="name" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
          <input type="text" name="name" id="name" className="font-semibold bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Name" onChange={handleChange} value={name} />
          <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Full Name</span>
        </label>
        <label htmlFor="semester" className="relative flex gap-8 w-full">
          <span className="text-md font-semibold text-zinc-500">Semester</span>
          <select onChange={handleChange} name="semester" className="focus:outline-sky-300 focus:bg-sky-100 focus rounded-sm">
            <option value="">Select</option>
            {(function () {
              const array = [];
              for (let i = 1; i <= 6; i++) {
                array.push(
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              }
              return array;
            })()}
          </select>
        </label>
        <label htmlFor="password" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
          <input type="text" name="password" id="password" className="font-semibold bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Password" onChange={handleChange} value={password} />
          <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Password</span>
        </label>
        <label htmlFor="checkPassword" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
          <input type="text" name="checkPassword" id="checkPassword" className="font-semibold bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Confirm Password" onChange={handleChange} value={checkPassword} />
          <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Confirm Password</span>
        </label>
        <button type="submit" className="w-full bg-sky-600 py-2 text-zinc-200 font-bold focus:outline-transparent focus:ring-4 focus:ring-sky-300 rounded-sm">
          Login
        </button>
      </form>
      <div className="text-center text-sm">
        <p>Already registered?</p>
        <Link to="/student/login" className="underline">
          Login now
        </Link>
      </div>
    </div>
  );
}
