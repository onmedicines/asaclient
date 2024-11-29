import React, { useState } from "react";

export default function StudentLogin() {
  return (
    <div className="flex flex-col gap-2 items-center mt-8">
      <h1 className="text-3xl font-bold text-center">Student Login</h1>
      <p className="text-sm">Please enter your details</p>
      <form className="w-full flex flex-col gap-8 px-8 py-8">
        <label htmlFor="rollNumber" className="flex flex-col w-full border-b-2 border-b-zinc-700">
          <span className="text-sm font-bold text-zinc-500">Roll Number</span>
          <input type="number" name="rollNumber" id="rollNumber" className="py-2 focus:outline-none" />
        </label>
        <label htmlFor="password" className="flex flex-col w-full border-b-2 border-b-zinc-700">
          <span className="text-sm font-bold text-zinc-500">Password</span>
          <input type="text" name="password" id="password" className="py-2 focus:outline-none" />
        </label>
        <button type="submit" className="w-full bg-sky-600 py-2 text-zinc-200 font-bold">
          Login
        </button>
      </form>
    </div>
  );
}
