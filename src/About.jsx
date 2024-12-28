import React from "react";
import { useNavigate } from "react-router-dom";

const jsonData = {
  ADMIN: {
    _id: "67457260116b9f35c872e403",
    username: "puneet123",
    password: "password",
    name: "Dr. Puneet Mishra",
  },
  FACULTY: [
    {
      _id: "675fa53a53edc434e54ff3b3",
      username: "ayushi123",
      password: "password",
      name: "Ms. Ayushi",
    },
    {
      _id: "675fa53a53edc434e54ff3b3",
      username: "usman123",
      password: "password",
      name: "Mr. Usman",
    },
  ],
  STUDENT: [
    {
      _id: "674fc3d4e380235fc8bb7f2f",
      rollNumber: "10",
      name: "Harsh Mishra",
      semester: "3",
      password: "password",
      subjects: [
        { name: "Sub1", code: "107", isSubmitted: true },
        { name: "Sub2", code: "108", isSubmitted: true },
        { name: "Sub3", code: "109", isSubmitted: true },
      ],
    },
    {
      _id: "6757ce2a220779ad16737140",
      rollNumber: "22",
      name: "Akash Verma",
      semester: "6",
      password: "password",
      subjects: [
        { name: "Sub1", code: "116", isSubmitted: true },
        { name: "Sub2", code: "117", isSubmitted: true },
        { name: "Sub3", code: "118", isSubmitted: true },
      ],
    },
  ],
};

export default function App() {
  const navigate = useNavigate();

  function handlePrevious(e) {
    navigate(-1);
  }

  return (
    <div className="min-h-full bg-white w-full max-w-screen-sm rounded-md p-8 sm:p-16 flex flex-col gap-4">
      <section className="">
        <button onClick={handlePrevious} className="bg-zinc-500 hover:bg-zinc-600 transition-colors duration-200 text-white px-4 py-1 rounded-sm mb-4">
          Back
        </button>
        <h2 className="text-zinc-700 font-bold text-xl">Data in JSON Format for testing app</h2>
        <p>Use this data to test this app for example use the student roll number and password to login for a student.</p>
        <br />
        <pre className="text-sm overflow-x-auto text-wrap whitespace-pre-wrap break-all">{JSON.stringify(jsonData, null, 2)}</pre>
      </section>
    </div>
  );
}
