import React, { useState, useEffect } from "react";

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState({
    rollNumber: null,
    name: "",
    semester: null,
    subjects: [],
    assignments: [],
  });
  const [file, setFile] = useState();
  const [code, setCode] = useState();

  // TODO use different states for success and error messages
  const [serverResponse, setServerResponse] = useState();

  useEffect(() => {
    updateStudentDetails();
  }, []);

  async function updateStudentDetails() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/getStudentInfo", {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }
      const data = await response.json();
      setStudentData(data.student);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChange(e) {
    try {
      const { files, name } = e.target;
      if (files[0].mimetype !== pdf) throw new Error("File must be a pdf");
      setFile(files[0]);
      setCode(Number(name));
      setServerResponse();
    } catch (err) {
      setServerResponse();
    }
  }

  async function handleSubmitAssignment(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Something went wrong, please login again");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("code", code);

      const response = await fetch("http://localhost:3000/submitAssignment", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      if (!response.ok) throw new Error("The assignment could not be submitted");
      const data = await response.json();
      setServerResponse(data.message);
      setFile();
      setCode();
      updateStudentDetails();
    } catch (err) {
      setServerResponse(err.message);
    }
  }

  return (
    <div className="w-full min-h-full bg-white rounded-md p-4 flex flex-col gap-4">
      {serverResponse && <p className="text-center">{serverResponse}</p>}
      <h1 className="text-xl font-bold text-sky-600">Hello, {studentData.name}</h1>

      <div>
        <p className="text-lg font-semibold text-zinc-700">Details</p>
        <p className="">Roll Number: {studentData.rollNumber}</p>
        <p className="">Semester: {studentData.semester}</p>
      </div>

      <div>
        <p className="text-lg font-semibold text-zinc-700">Assignments</p>
        <div className="flex flex-col gap-2">
          {studentData.subjects.map((subject, index) => {
            return (
              <div key={index} className="flex flex-col">
                <p className="text-lg text-sky-600 font-semibold">{subject.name}</p>
                <p className="">Paper Code: {subject.code}</p>
                <p className="">Status: {subject.isSubmitted ? "Submitted" : "Not Submitted"}</p>
                {subject.isSubmitted ? (
                  <button name={`${subject.code}`} className="text-sky-600 border border-sky-600 px-2 py-1 mt-1 rounded-sm hover:bg-sky-600 hover:text-white transition-colors duration-20">
                    View
                  </button>
                ) : (
                  <form onSubmit={handleSubmitAssignment}>
                    <input onChange={handleChange} name={`${subject.code}`} type="file" className="block text-sm file:mr-4 file:rounded-sm file:border file:border-zinc-600 file:text-sm file:font-semibold file:text-zinc-600  hover:file:bg-zinc-600 hover:file:text-white file:transition-colors file:duration-200" />
                    <button name={`${subject.code}`} className="text-sky-600 border border-sky-600 px-2 py-1 mt-1 rounded-sm hover:bg-sky-600 hover:text-white transition-colors duration-200">
                      Submit
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
