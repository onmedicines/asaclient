import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";

export default function ViewAllFaculties() {
  const { setIsLoading, setError, setSuccess } = useContext(LoadingContext);
  const [faculties, setFaculties] = useState();

  useEffect(() => {
    loadFaculties();
  }, []);

  const loadFaculties = async () => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getAllFaculties`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) throw new Error(data.message);
      setFaculties(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const _id = e.target.id;
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/deleteFaculty`, {
        method: "delete",
        headers: {
          Authorization: `BEARER ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      const data = await response.json();
      setIsLoading(false);

      loadFaculties();
      setSuccess(data.message);
      setError("");

      if (!response.ok) throw new Error(data.message);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      setSuccess("");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-zinc-600 font-semibold">All faculties:</h1>
      {faculties &&
        faculties.map((faculty, index) => (
          <form key={faculty._id} id={faculty._id} onSubmit={handleSubmit} className="ring rounded-sm px-4 py-2 flex flex-col md:flex-row md:gap-4 flex-wrap md:items-center">
            <h1 className="text-zinc-500 ">
              Name: <span className="text-zinc-700 font-semibold">{faculty.name}</span>
            </h1>
            <h1 className="text-zinc-500 ">
              Username: <span className="text-zinc-700 font-semibold">{faculty.username}</span>
            </h1>
            <h1 className="text-zinc-500 ">
              Password: <span className="text-zinc-700 font-semibold">{faculty.password}</span>
            </h1>
            <button type="submit" className="self-start md:self-auto md:ml-auto bg-red-400 hover:bg-red-500 text-white px-2 mt-4 md:mt-0 rounded-sm">
              Remove
            </button>
          </form>
        ))}
    </div>
  );
}
