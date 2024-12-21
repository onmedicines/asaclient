import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
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

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

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

      setIsLoading(false);

      if (!response.ok) throw new Error("The assignment could not be submitted");
      const data = await response.json();
      setSuccess(data.message);
      setError();
      updateStudentDetails();
      setFile();
      setCode();
      updateStudentDetails();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setSuccess();
    }
  }

  async function handleView(e) {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("User could not be verified");
      const code = e.target.name;
      let Dynamic_URL = `http://localhost:3000/student/getAssignment?code=${code}`;
      const response = await fetch(Dynamic_URL, {
        method: "GET",
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      if (!response.ok) throw new Error("Could not submit the assignment. Please try again");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      if (!blob || !url) throw new Error("Could not read file. Please try again");

      window.open(url, "_blank");

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setSuccess();
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/student/login");
  }

  return (
    <div className={`min-h-full bg-white w-full max-w-screen-sm rounded-md p-8 sm:p-16 flex flex-col gap-4 ${isLoading && "pointer-events-none cursor-wait"}`}>
      {isLoading && (
        <div className="text-center fixed right-4 bottom-4 rounded-sm w-fit bg-sky-500 p-4 text-white">
          <p>Loading...</p>
          <p>(It may take some time if the file is large in size)</p>
        </div>
      )}
      {error && <p className="text-center fixed right-4 bottom-4 rounded-sm w-fit bg-red-500 p-4 text-white">{error}</p>}
      {success && <p className="text-green-700 text-center">{success}</p>}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-sky-600">Hello, {studentData.name}</h1>
        <button className="bg-red-400 hover:bg-red-500 transition-colors duration-200 text-white px-2 py-1 rounded-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div>
        <p className="text-lg font-semibold text-zinc-700">Details</p>
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <p className="">Roll Number: {studentData.rollNumber}</p>
          <p className="">Semester: {studentData.semester}</p>
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold text-zinc-700">Assignments</p>
        <div className="flex flex-col gap-4">
          {studentData.subjects.map((subject, index) => {
            return (
              <div key={index} className="flex flex-col">
                <p className="text-lg text-sky-600 font-semibold">{subject.name}</p>
                <div className="flex flex-col sm:flex-row sm:gap-8 sm:flex-wrap sm:items-center">
                  <p className="">Paper Code: {subject.code}</p>
                  <p className="">Status: {subject.isSubmitted ? "Submitted" : "Not Submitted"}</p>
                  {subject.isSubmitted ? (
                    <button onClick={handleView} name={`${subject.code}`} className="text-sky-600 border border-sky-600 px-2 rounded-sm hover:bg-sky-600 hover:text-white transition-colors duration-20">
                      View
                    </button>
                  ) : (
                    <form onSubmit={handleSubmitAssignment} encType="multipart/form-data" className="md:flex md:items-center md:gap-4">
                      <input onChange={handleChange} name={`${subject.code}`} type="file" className="block text-sm file:mr-4 file:rounded-full file:px-2 file:py-1 sm:file:px-4 sm:file:py-2 file:border file:border-zinc-600 file:text-sm file:font-semibold file:text-zinc-600  hover:file:bg-zinc-600 hover:file:text-white file:transition-colors file:duration-200 mb-2" />
                      <button name={`${subject.code}`} className="w-full sm:w-auto text-sky-600 border border-sky-600 px-2 rounded-sm hover:bg-sky-600 hover:text-white transition-colors duration-200">
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
