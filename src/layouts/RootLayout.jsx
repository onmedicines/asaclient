import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LoadingContext } from "../context/LoadingContext";
import QuestionMark from "../components/QuestionMark";

export default function RootLayout() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let timeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [success]);

  return (
    <div className={`min-h-screen w-full text-zinc-800 flex flex-col ${isLoading && "pointer-events-none cursor-wait"}`}>
      {isLoading && (
        <div className="z-10 text-center fixed right-4 bottom-4 rounded-sm w-fit bg-sky-500 p-4 text-white">
          <p>Loading...</p>
          <p>(It may take some time if the file is large in size)</p>
        </div>
      )}
      {error && <p className="z-10 text-center fixed right-4 bottom-4 rounded-sm w-fit bg-red-500 p-4 text-white">{error}</p>}
      {success && <p className="z-10 text-center fixed right-4 bottom-4 rounded-sm w-fit bg-emerald-500 p-4 text-white">{success}</p>}

      <header className="text-left sm:text-center text-xl sm:text-2xl font-bold py-4 px-2 bg-sky-600 text-zinc-200 relative">
        Assignment Submission App
        <Link to="/about" className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <QuestionMark />
        </Link>
      </header>
      <main className={`relative flex flex-col grow bg-sky-200 py-4 px-4 items-center ${location.pathname === "/" && "justify-center"}`}>
        {(location.pathname === "/student/login" || location.pathname === "/student/register" || location.pathname === "/faculty/login" || location.pathname === "/admin/login") && (
          <Link to={"/"} className="font-semibold text-white bg-sky-300 px-3 py-1 rounded-sm hover:bg-sky-400 transition-colors duration-200 mb-4">
            Home
          </Link>
        )}
        <LoadingContext.Provider value={{ setIsLoading, setError, setSuccess }}>
          <Outlet />
        </LoadingContext.Provider>
      </main>
    </div>
  );
}
