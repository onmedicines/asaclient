import React, { createContext, useEffect, useState, useContext } from "react";
import { use } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";

// context defined in the same file
// because its only going to be used by its direct children
export const StateContext = createContext(false);

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const { setError, setIsLoading } = useContext(LoadingContext);

  // update to be an object instead of a string
  // if in future want to add more details other than just name
  const [facultyName, setFacultyName] = useState("");

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  async function getDetails() {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getFacultyInfo`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setIsLoading(false);
      if (!response.ok) throw new Error("Could not fetch data");
      const { name } = await response.json();
      setFacultyName(name);
      setError();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout(e) {
    localStorage.removeItem("token");
    navigate("/faculty/login");
  }

  return (
    <div className={`min-h-full bg-white w-full max-w-screen-md rounded-md p-8 sm:p-16 flex flex-col gap-4 ${isLoading && "pointer-events-none cursor-wait"}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-sky-600">Hello, {facultyName}</h1>
        <button className="bg-red-400 hover:bg-red-500 transition-colors duration-200 text-white px-2 py-1 rounded-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="">
        <div className="flex flex-col gap-2">
          <p className="text-zinc-600 font-semibold">Search by:</p>
          <div className="flex gap-2 flex-wrap">
            <NavLink to="/faculty/dashboard/searchRollNumber" className={({ isActive }) => `text-sm px-3 flex items-center rounded-full border border-sky-600 hover:bg-sky-600 transition-colors duration-200 hover:text-white ${isActive && "bg-sky-600 text-white"}`}>
              Roll Number
            </NavLink>
            <NavLink to="/faculty/dashboard/searchSubmitted" className={({ isActive }) => `text-sm px-3 flex items-center rounded-full border border-sky-600 hover:bg-sky-600 transition-colors duration-200 hover:text-white ${isActive && "bg-sky-600 text-white"}`}>
              Submitted
            </NavLink>
            <NavLink to="/faculty/dashboard/searchNotSubmitted" className={({ isActive }) => `text-sm px-3 flex items-center rounded-full border border-sky-600 hover:bg-sky-600 transition-colors duration-200 hover:text-white ${isActive && "bg-sky-600 text-white"}`}>
              Not Submitted
            </NavLink>
          </div>
        </div>
      </div>
      <StateContext.Provider value={{ setIsLoading, setError }}>
        <div className="grow">{<Outlet />}</div>
      </StateContext.Provider>
    </div>
  );
}
