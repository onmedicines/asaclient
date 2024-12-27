import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";

export default function AddStudent() {
  const { setIsLoading, setError, setSuccess } = useContext(LoadingContext);
  const [rollNumber, setRoll] = useState("");
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        console.log("Invalid");
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (!rollNumber || !name || !semester || !password || !confirmPassword) throw new Error("One or more fields missing");
      if (password !== confirmPassword) throw new Error("Password and confirm password do not match");
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addStudent`, {
        method: "POST",
        body: JSON.stringify({ rollNumber, name, semester, password }),
        headers: {
          Authorization: `BEARER ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) throw new Error(data.message);
      setSuccess(data.message);

      // reset
      setRoll("");
      setName("");
      setSemester("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      setSuccess("");
    }
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="flex flex-col items-center py-8 rounded-md bg-white w-full max-w-lg ring px-8">
        <h1 className="text-2xl font-bold text-center text-sky-600">Add student</h1>
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
          <label htmlFor="confirmPassword" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
            <input type="text" name="confirmPassword" id="confirmPassword" className="font-semibold bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Confirm Password" onChange={handleChange} value={confirmPassword} />
            <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Confirm Password</span>
          </label>
          <button type="submit" className="w-full bg-sky-600 py-2 text-zinc-200 font-bold focus:outline-transparent focus:ring-4 focus:ring-sky-300 rounded-sm">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
