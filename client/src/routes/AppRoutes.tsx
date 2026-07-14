import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import CreateTask from "../pages/CreateTask";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ResetPassword from "../pages/ResetPassword";
import Settings from "../pages/Settings";
import ChangePassword from "../pages/ChangePassword";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
