import { useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";

export default function SearchByRoll() {
  const { setIsLoading, setError } = useContext(LoadingContext);

  const [rollNumber, setRollNumber] = useState();
  const [student, setStudent] = useState();
  // Format:
  // {
  //   rollNumber,
  //   name,
  //   semester,
  //   subjects: [
  //     {
  //       name,
  //       code,
  //       isSubmitted,
  //     },
  //   ],
  // }

  function handleChange(e) {
    const { value } = e.target;
    setRollNumber(value);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getStudentByRoll`, {
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
      setStudent(data);
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
      let Dynamic_URL = `${import.meta.env.VITE_BACKEND_URL}/faculty/getAssignment?code=${encodeURIComponent(code)}&rollNumber=${rollNumber}`;
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
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full max-w-md">
        <input onChange={handleChange} type="number" placeholder="Roll Number to search..." name="rollNumber" className="grow focus:outline-none ring rounded-sm px-3 py-1" />
        <button type="submit" className="bg-sky-200 p-1 ring ring-sky-200 rounded-sm">
          <SearchSVG />
        </button>
      </form>
      <section>
        {student && (
          <>
            <div className="w-full flex flex-wrap flex-col sm:flex-row sm:gap-4 mb-4">
              <h1 className="text-zinc-500 ">
                Name: <span className="text-zinc-700 font-semibold">{student.name}</span>
              </h1>
              <h1 className="text-zinc-500">
                Semester: <span className="text-zinc-700 font-semibold">{student.semester}</span>
              </h1>
              <h1 className="text-zinc-500">
                Roll Number: <span className="text-zinc-700 font-semibold">{student.rollNumber}</span>
              </h1>
            </div>
            <div>
              {student.subjects.map((subject, index) => {
                return subject.isSubmitted ? (
                  <form key={index} name={`${subject.code}`} onSubmit={handleView} className="border-b-2 border-zinc-400 flex justify-between mb-2 pb-2 items-center">
                    <p className="">Subject Code: {subject.code}</p>
                    <button type="submit" className="bg-zinc-700 text-white px-2 py-1 text-sm rounded-sm hover:bg-zinc-800 transition-colors duration-200">
                      View
                    </button>
                  </form>
                ) : (
                  <div className="border-b-2 border-zinc-400 flex justify-between mb-2 pb-2 items-center">
                    <p className="">Subject Code: {subject.code}</p>
                    <p>N/A</p>
                  </div>
                );
              })}
            </div>
          </>
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
