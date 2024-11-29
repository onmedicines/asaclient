import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function StudentLogin() {
  return (
    <div className="flex flex-col gap-2 items-center py-8 rounded-md bg-white">
      <h1 className="text-3xl font-bold text-center text-sky-600">Student Login</h1>
      <p className="text-sm">Please enter your details</p>
      <form className="w-full flex flex-col gap-8 px-8 py-8 mt-4">
        <label htmlFor="rollNumber" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
          <input type="number" name="rollNumber" id="rollNumber" className="bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Roll Number" />
          <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Roll Number</span>
        </label>
        <label htmlFor="password" className="relative flex flex-col w-full border-b-2 border-b-zinc-700">
          <input type="text" name="password" id="password" className="bg-inherit peer py-2 focus:outline-none placeholder-transparent" placeholder="Password" />
          <span className="text-xs font-semibold text-zinc-500 absolute -top-4 left-0 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs transition-all duration-100">Password</span>
        </label>
        <button type="submit" className="w-full bg-sky-600 py-2 text-zinc-200 font-bold focus:outline-transparent focus:ring-4 focus:ring-sky-300 rounded-sm">
          Login
        </button>
      </form>
      <div className="text-center text-sm">
        <p>Not registered yet?</p>
        <Link to="/student/register" className="underline ">
          Register now
        </Link>
      </div>
    </div>
  );
}
