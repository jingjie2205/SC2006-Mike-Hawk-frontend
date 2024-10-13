import { StrictMode } from "react";
import { createRoot, ReactDOM } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import RegisterForm from "./Components/RegisterForm/RegisterForm.jsx";
import MakeReport from "./Components/MakeReport/MakeReport.jsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";
import RewardsPage from "./Components/RewardsPage/RewardsPage.jsx";
import UserMyReport from "./Components/UserMyReport/UserMyReport.jsx";
import UserDashboard from "./Components/UserDashboard/UserDashboard.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <App /> },
  { path: "/register", element: <RegisterForm /> },
  { path: "/makereport", element: <MakeReport /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/rewards", element: <RewardsPage /> },
  { path: "/myreports", element: <UserMyReport /> },
  { path: "/userdashboard", element: <UserDashboard /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
