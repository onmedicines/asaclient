import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";

export default function StudentDashboard() {
  const { setIsLoading, setError } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState();
  const [studentData, setStudentData] = useState({
    rollNumber: null,
    name: "",
    semester: null,
    subjects: [],
    assignments: [],
  });
  const [file, setFile] = useState();
  const [code, setCode] = useState();

  useEffect(() => {
    updateStudentDetails();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [success]);

  async function updateStudentDetails() {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getStudentInfo`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setIsLoading(false);

      if (!response.ok) throw new Error("Failed to fetch student details");
      const data = await response.json();
      setStudentData(data.student);
    } catch (err) {
      setError(err.message);
      setSuccess();
      setIsLoading(false);
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
      setIsLoading(false);
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

      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/submitAssignment`, {
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
      let Dynamic_URL = `${import.meta.env.VITE_BACKEND_URL}/student/getAssignment?code=${encodeURIComponent(code)}`;

      setIsLoading(true);
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
    <div className={`min-h-full bg-white w-full max-w-screen-sm rounded-md p-8 sm:p-16 flex flex-col gap-4 `}>
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
