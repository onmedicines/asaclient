import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import Error from "./pages/Error.jsx";
import StudentLogin from "./pages/student/StudentLogin.jsx";
import StudentRegister from "./pages/student/StudentRegister.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import FacultyLogin from "./pages/faculty/FacultyLogin.jsx";
import FacultyDashboard from "./pages/faculty/FacultyDashboard.jsx";
import ProtectedStudent from "./components/ProtectedStudent.jsx";
import ProtectedFaculty from "./components/ProtectedFaculty.jsx";
import SearchByRoll from "./pages/faculty/SearchByRoll.jsx";
import SearchSubmitted from "./pages/faculty/SearchSubmitted.jsx";
import SearchNotSubmitted from "./pages/faculty/SearchNotSubmitted.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import ProtectedAdmin from "./components/ProtectedDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AddStudent from "./pages/admin/AddStudent.jsx";
import AddFaculty from "./pages/admin/AddFaculty.jsx";
import ViewAllFaculties from "./pages/admin/ViewAllFaculties.jsx";
import SearchStudentByRoll from "./pages/admin/SearchStudentByRoll.jsx";
import SearchStudentsBySemester from "./pages/admin/SearchStudentsBySemester.jsx";

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
        children: [
          {
            index: true,
            element: <Navigate to="searchRollNumber" replace />,
          },
          {
            path: "searchRollNumber",
            element: <SearchByRoll />,
          },
          {
            path: "searchSubmitted",
            element: <SearchSubmitted />,
          },
          {
            path: "searchNotSubmitted",
            element: <SearchNotSubmitted />,
          },
        ],
      },
      {
        path: "admin/login",
        element: <AdminLogin />,
      },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedAdmin>
            <AdminDashboard />
          </ProtectedAdmin>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="addFaculty" replace />,
          },
          {
            path: "addStudent",
            element: <AddStudent />,
          },
          {
            path: "addFaculty",
            element: <AddFaculty />,
          },
          {
            path: "viewAllFaculties",
            element: <ViewAllFaculties />,
          },
          {
            path: "searchStudentBySemester",
            element: <SearchStudentsBySemester />,
          },
          {
            path: "searchStudentByRoll",
            element: <SearchStudentByRoll />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
