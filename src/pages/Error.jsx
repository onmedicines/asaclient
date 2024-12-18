import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen max-h-screen min-h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-4xl sm:text-6xl">OOPS!</h1>
      <p className="text-lg sm:text-2xl">Something went wrong</p>

      <div className="flex gap-2">
        <button onClick={() => navigate(-1)} className="underline text-sky-600 sm:text-lg">
          Go Back
        </button>
        <p>or</p>
        <Link to={"/"} className="underline text-sky-600 sm:text-lg">
          Back to home
        </Link>
      </div>
    </div>
  );
}
