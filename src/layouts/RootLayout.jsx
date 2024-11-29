import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="h-screen min-h-screen w-screen max-w-screen text-zinc-800 flex flex-col">
      <header className="text-center text-xl sm:text-2xl font-bold py-4 bg-sky-600 text-zinc-200 ">Assignment Submission App</header>
      <main className="flex flex-col grow">
        <Outlet />
      </main>
    </div>
  );
}
