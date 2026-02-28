import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Analysis";
import Todos from "./pages/Todos";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
