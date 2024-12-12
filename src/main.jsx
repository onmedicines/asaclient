import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import Error from "./pages/Error.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import StudentRegister from "./pages/StudentRegister.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import FacultyLogin from "./pages/faculty/FacultyLogin.jsx";
import FacultyDashboard from "./pages/faculty/FacultyDashboard.jsx";
import ProtectedStudent from "./components/ProtectedStudent.jsx";
import ProtectedFaculty from "./components/ProtectedFaculty.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "student/login",
        element: <StudentLogin />,
      },
      {
        path: "student/register",
        element: <StudentRegister />,
      },
      {
        path: "student/dashboard",
        element: (
          <ProtectedStudent>
            <StudentDashboard />
          </ProtectedStudent>
        ),
      },
      {
        path: "faculty/login",
        element: <FacultyLogin />,
      },
      {
        path: "faculty/dashboard",
        element: (
          <ProtectedFaculty>
            <FacultyDashboard />
          </ProtectedFaculty>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
