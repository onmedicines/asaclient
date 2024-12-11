import { Link, Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="h-screen min-h-screen w-full text-zinc-800 flex flex-col">
      <header className="text-center text-xl sm:text-2xl font-bold py-4 bg-sky-600 text-zinc-200 ">Assignment Submission App</header>
      <main className="relative flex flex-col grow bg-sky-200 py-8 px-4 justify-center items-center">
        {(location.pathname === "/student/login" || location.pathname === "/student/register" || location.pathname === "/faculty/login" || location.pathname === "/admin/login") && (
          <Link to={"/"} className="absolute top-4 left-1/2 transform -translate-x-1/2 font-semibold text-white bg-sky-300 px-3 py-1 rounded-sm hover:bg-sky-400 transition-colors duration-200">
            Home
          </Link>
        )}
        <Outlet />
      </main>
    </div>
  );
}
