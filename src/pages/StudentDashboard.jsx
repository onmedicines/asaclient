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

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

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
      setSuccess();
    }
  }

  function handleChange(e) {
    try {
      const { files, name } = e.target;
      if (files[0].type !== "application/pdf") throw new Error("File must be a pdf");
      setFile(files[0]);
      setCode(Number(name));
      setError();
      setSuccess();
    } catch (err) {
      setError(err.message);
      setSuccess();
    }
  }

  async function handleSubmitAssignment(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Something went wrong, please login again");
      const formData = new FormData();
      if (!file || !code) throw new Error("Please select a file to submit");
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
      setSuccess(data.message);
      setError();
      updateStudentDetails();
      setFile();
      setCode();
      updateStudentDetails();
    } catch (err) {
      setError(err.message);
      setSuccess();
    }
  }

  async function handleView(e) {
    const token = localStorage.getItem("token");
    const code = e.target.name;
    let Dynamic_URL = `http://localhost:3000/student/getAssignment?code=${encodeURIComponent(code)}`;
    const response = await fetch(Dynamic_URL, {
      method: "GET",
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });
    const file = await response.json();

    // convert the pdf data [here: file.file.data.data]
    // to a readable pdf object
    const uint8Array = new Uint8Array(file.file.data.data);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  }

  return (
    <div className="w-full min-h-full bg-white rounded-md p-4 flex flex-col gap-4">
      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-700 text-center">{success}</p>}
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
                  <button onClick={handleView} name={`${subject.code}`} className="text-sky-600 border border-sky-600 px-2 py-1 mt-1 rounded-sm hover:bg-sky-600 hover:text-white transition-colors duration-20">
                    View
                  </button>
                ) : (
                  <form onSubmit={handleSubmitAssignment} encType="multipart/form-data">
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
