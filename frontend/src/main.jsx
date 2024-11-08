import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginForm from "./Components/LoginForm/LoginForm.jsx";
import RegisterForm from "./Components/RegisterForm/RegisterForm.jsx";
import PasswordResetForm from "./Components/PasswordResetForm/PasswordResetForm.jsx";
import MakeReport from "./Components/MakeReport/MakeReport.jsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";
import RewardsPage from "./Components/RewardsPage/RewardsPage.jsx";
import UserMyReport from "./Components/UserMyReport/UserMyReport.jsx";
import UserDashboard from "./Components/UserDashboard/UserDashboard.jsx";
import AdminManagementPage from "./Components/AdminManagementPage/AdminManagementPage.jsx";
import MyRewardsPage from "./Components/RewardsPage/MyRewardsPage.jsx";
import AuthorityMyReport from "./Components/AuthorityMyReport/AuthorityMyReport.jsx";
import ReportDetail from "./Components/UserMyReport/ReportDetail.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx"; 
import ForbiddenPage from "./Components/ForbiddenPage/ForbiddenPage.jsx"; 
import AdminRestrictedRoute from "./Components/AdminRestrictedRoute/AdminRestrictedRoute.jsx"; 


const router = createBrowserRouter([
  { path: "/", element: <LoginForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegisterForm /> },
  { path: "/reset-password", element: <PasswordResetForm /> },
  { path: "/makereport", element: <MakeReport /> },
  { path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
  { path: "/rewards", element: <ProtectedRoute><RewardsPage /></ProtectedRoute> },
  { path: "/myrewards", element: <ProtectedRoute><MyRewardsPage /></ProtectedRoute> },
  { path: "/myreports", element: <ProtectedRoute><UserMyReport /></ProtectedRoute> },
  { path: "/report/:id", element: <ProtectedRoute><ReportDetail /></ProtectedRoute> },
  { path: "/userdashboard", element: <ProtectedRoute><UserDashboard /></ProtectedRoute> },
  { path: "/authoritymyreports", element: <ProtectedRoute><AuthorityMyReport /></ProtectedRoute> },
  { path: "/moderatordashboard", element: <AdminRestrictedRoute><AdminManagementPage /></AdminRestrictedRoute> },
  { path: "/forbidden", element: <ForbiddenPage /> }, 
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </StrictMode>
  </QueryClientProvider>
);
