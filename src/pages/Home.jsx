import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div id="home" className="w-full h-full flex flex-col gap-8 items-center justify-center font-semibold">
      <Link to="/student" className="w-full min-w-60 max-w-xl">
        <button className="text-2xl px-8 py-4 bg-sky-600 text-zinc-200 w-full rounded-sm">Student</button>
      </Link>
      <Link to="/faculty" className="w-full min-w-60 max-w-xl">
        <button className="text-2xl px-8 py-4 bg-sky-600 text-zinc-200 w-full rounded-sm">Faculty</button>
      </Link>
      <Link to="/admin" className="w-full min-w-60 max-w-xl">
        <button className="text-2xl px-8 py-4 bg-sky-600 text-zinc-200 w-full min-w-60 max-w-2xl rounded-sm">Admin</button>
      </Link>
    </div>
  );
}
