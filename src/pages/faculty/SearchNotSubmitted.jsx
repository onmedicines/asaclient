import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";

export default function SearchSubmitted() {
  const { setIsLoading, setError } = useContext(LoadingContext);
  const [subjectCodes, setSubjectCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [fetchedStudents, setFetchedStudents] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getSubjects`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      const { subjectCodes: codes } = await response.json();
      setSubjectCodes(codes.sort((a, b) => a - b));
    })();
  }, []);

  function handleChange(e) {
    const { value } = e.target;
    setSelectedCode(value);
    setFetchedStudents([]);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!selectedCode) throw new Error("Please select a subject");
      const DYNAMIC_URL = `${import.meta.env.VITE_BACKEND_URL}/faculty/getAllNotSubmitted?code=${selectedCode}`;
      setIsLoading(true);
      const response = await fetch(DYNAMIC_URL, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setIsLoading(false);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const { studentsWhoHaveNotSubmitted } = await response.json();
      // console.log(studentsWhoHaveNotSubmitted);
      if (!studentsWhoHaveNotSubmitted) throw new Error("Could not fetch assignments. Please try again.");
      setFetchedStudents(studentsWhoHaveNotSubmitted);
      if (studentsWhoHaveNotSubmitted.length === 0) throw new Error("All registered students have submitted the assignment");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleView(e) {
    try {
      e.preventDefault();
      const rollNumber = e.target.name;
      const token = localStorage.getItem("token");
      let Dynamic_URL = `${import.meta.env.VITE_BACKEND_URL}/faculty/getAssignment?code=${encodeURIComponent(selectedCode)}&rollNumber=${rollNumber}`;
      setIsLoading(true);
      const response = await fetch(Dynamic_URL, {
        method: "get",
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      if (!response.ok) throw new Error("Could not fetch data");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setIsLoading(false);
      window.open(url, "_blank");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-6">
        <label htmlFor="subjectCodes" className="flex gap-2">
          Subject:
          <select name="subjectCode" id="subjectCode" value={selectedCode} onChange={handleChange} className="border-2 border-sky-600 rounded-sm">
            <option value="">Select</option>
            {subjectCodes &&
              subjectCodes.map((code, index) => (
                <option key={index} value={`${code}`}>
                  {code}
                </option>
              ))}
          </select>
        </label>
        <button type="submit" className="bg-sky-600 text-white px-2 rounded-sm hover:bg-sky-700">
          Search
        </button>
      </form>
      <section className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between border-b-2 border-zinc-400 pb-2">
          <p className="font-semibold">Roll number</p>
          <p className="font-semibold">Name</p>
        </div>
        {fetchedStudents.map(({ rollNumber, name }) => (
          <div key={rollNumber} className="border-b-2 border-zinc-400 flex justify-between mb-2 pb-2 items-center">
            <p className="">{rollNumber}</p>
            <p className="">{name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
