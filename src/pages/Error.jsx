import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="h-screen w-screen max-h-screen min-h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-4xl sm:text-6xl">OOPS!</h1>
      <p className="text-lg sm:text-2xl">Something went wrong</p>
      <Link to={"/"} className="underline text-sky-600 sm:text-lg">
        Back to home
      </Link>
    </div>
  );
}
