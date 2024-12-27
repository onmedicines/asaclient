import React, { useEffect, useContext, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { SearchSVG } from "../../components/SearchSVG";

export default function SearchStudentsBySemester() {
  const { setIsLoading, setError, setSuccess } = useContext(LoadingContext);
  const [semester, setSemester] = useState();
  const [students, setStudents] = useState();

  function handleChange(e) {
    const { value } = e.target;
    setSemester(value);
    setStudents();
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getStudentsBySemester?semester=${semester}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) throw new Error(data.message);
      setStudents(data);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex md:gap-8 justify-between items-center">
        <label htmlFor="semester" className="flex gap-2 items-center">
          Semester:
          <select name="semester" id="semester" onChange={handleChange} value={semester} className="border rounded-sm border-black">
            <option value="">select</option>
            {(() => {
              const arr = [];
              for (let i = 1; i <= 6; i++) {
                arr.push(
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              }
              return arr;
            })()}
          </select>
        </label>
        <button type="submit" className="bg-zinc-500 hover:bg-zinc-700 transition-colors duration-200 text-white px-2 rounded-sm">
          Search
        </button>
      </form>
      {students && (
        <section className="flex flex-col gap-4 mt-4">
          <h1 className="text-zinc-600 font-semibold">
            Sem {semester} students (total {students.length}):
          </h1>
          {students.map((student) => (
            <div key={student._id} className="ring rounded-sm px-4 py-2 flex flex-col md:flex-row md:gap-4 flex-wrap md:items-center hover:cursor-pointer">
              <h1 className="text-zinc-500 ">
                Name: <span className="text-zinc-700 font-semibold">{student.name}</span>
              </h1>
              <h1 className="text-zinc-500 ">
                Roll number: <span className="text-zinc-700 font-semibold">{student.rollNumber}</span>
              </h1>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
