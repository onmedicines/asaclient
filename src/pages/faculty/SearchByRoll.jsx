import { useState, useContext } from "react";
import { StateContext } from "./FacultyDashboard";

export default function SearchByRoll() {
  const { setIsLoading, setError } = useContext(StateContext);

  const [rollNumber, setRollNumber] = useState();
  const [student, setStudent] = useState({ name: "", subjectCodes: [] });

  function handleChange(e) {
    const { value } = e.target;
    setRollNumber(value);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/getStudentByRoll", {
        method: "post",
        headers: {
          Authorization: `BEARER ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNumber }),
      });
      setIsLoading(false);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setStudent({ name: data.name || "No name available", subjectCodes: data.codes || [] });
      setError();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleView(e) {
    try {
      e.preventDefault();
      const code = e.target.name;
      const token = localStorage.getItem("token");
      setIsLoading(true);
      let Dynamic_URL = `http://localhost:3000/faculty/getAssignment?code=${encodeURIComponent(code)}&rollNumber=${rollNumber}`;
      const response = await fetch(Dynamic_URL, {
        method: "get",
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      if (!response.ok) throw new Error("Could not fetch data");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="w-full max-w-md h-full flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
        <input onChange={handleChange} type="number" placeholder="Roll Number to search..." name="rollNumber" className="grow focus:outline-none ring rounded-sm px-3 py-1" />
        <button type="submit" className="bg-sky-200 p-1 ring ring-sky-200 rounded-sm">
          <SearchSVG />
        </button>
      </form>
      <section>
        {student.name && (
          <h1 className="text-zinc-700 font-semibold">
            Name: <span>{student.name}</span>
          </h1>
        )}
        {student.subjectCodes ? (
          student.subjectCodes.map((code, index) => {
            return (
              <form key={index} name={`${code}`} onSubmit={handleView} className="border-b-2 border-zinc-400 flex justify-between mb-2 pb-2 items-center">
                <p className="">Subject Code: {code}</p>
                <button type="submit" className="bg-zinc-700 text-white px-2 py-1 text-sm rounded-sm hover:bg-zinc-800 transition-colors duration-200">
                  View
                </button>
              </form>
            );
          })
        ) : (
          <p>No assignments submitted by this student</p>
        )}
      </section>
    </div>
  );
}

const SearchSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
};
