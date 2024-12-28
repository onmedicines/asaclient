import React, { useState, useEffect, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { setIsLoading, setError } = useContext(LoadingContext);
  const [adminName, setAdminName] = useState();

  useEffect(() => {
    (async function () {
      try {
        const token = localStorage.getItem("token");

        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getAdminDetails`, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const data = await response.json();
        setIsLoading(false);

        if (!response.ok) throw new Error(data.message);
        setAdminName(data.name);
        setError();
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    })();
  }, []);

  function handleLogout(e) {
    localStorage.removeItem("token");
    navigate("/admin/login");
  }

  return (
    <div className={`min-h-full grow bg-white w-full max-w-screen-md rounded-md p-8 sm:p-16 flex flex-col gap-4`}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-sky-600">Hello, {adminName}</h1>
        <button className="bg-red-400 hover:bg-red-500 transition-colors duration-200 text-white px-2 py-1 rounded-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="">
        <div className="flex flex-col gap-2">
          <p className="text-zinc-600 font-semibold">Search by:</p>
          <div className="flex gap-2 flex-wrap">
            <NavLink to="/admin/dashboard/addFaculty" className={({ isActive }) => `text-sm px-3 flex items-center rounded-full border border-sky-600 hover:bg-sky-600 transition-colors duration-200 hover:text-white ${isActive && "bg-sky-600 text-white"}`}>
              Add faculty
            </NavLink>
            <NavLink to="/admin/dashboard/addStudent" className={({ isActive }) => `text-sm px-3 flex items-center rounded-full border border-sky-600 hover:bg-sky-600 transition-colors duration-200 hover:text-white ${isActive && "bg-sky-600 text-white"}`}>
              Add student
            </NavLink>
            <NavLink to="/admin/dashboard/viewAllFaculties" className={({ isActive }) => `text-sm px-3 flex items-center rounded-full border border-sky-600 hover:bg-sky-600 transition-colors duration-200 hover:text-white ${isActive && "bg-sky-600 text-white"}`}>
              View all faculties
            </NavLink>
            <NavLink to="/admin/dashboard/searchStudentBySemester" className={({ isActive }) => `text-sm px-3 flex items-center rounded-full border border-sky-600 hover:bg-sky-600 transition-colors duration-200 hover:text-white ${isActive && "bg-sky-600 text-white"}`}>
              Search students by semester
            </NavLink>
            <NavLink to="/admin/dashboard/searchStudentByRoll" className={({ isActive }) => `text-sm px-3 flex items-center rounded-full border border-sky-600 hover:bg-sky-600 transition-colors duration-200 hover:text-white ${isActive && "bg-sky-600 text-white"}`}>
              Search student by roll
            </NavLink>
          </div>
        </div>
      </div>
      <div className="grow">{<Outlet />}</div>
    </div>
  );
}
