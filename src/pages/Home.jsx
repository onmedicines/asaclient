import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div id="home" className="px-8 w-full h-full flex flex-col gap-8 items-center justify-center font-semibold">
      <Link to="/student/login" className="w-full max-w-xl">
        <button className="sm:text-2xl px-8 py-4 bg-sky-600 text-zinc-200 w-full rounded-sm">Student</button>
      </Link>
      <Link to="/faculty/login" className="w-full max-w-xl">
        <button className="sm:text-2xl px-8 py-4 bg-sky-600 text-zinc-200 w-full rounded-sm">Faculty</button>
      </Link>
      <Link to="/admin/login" className="w-full max-w-xl">
        <button className="sm:text-2xl px-8 py-4 bg-sky-600 text-zinc-200 w-full rounded-sm">Admin</button>
      </Link>
    </div>
  );
}
