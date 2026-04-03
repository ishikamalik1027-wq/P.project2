import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./pages/Footer";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import TimeTracker from "./pages/TimeTracker";
import TimeEntry from "./pages/TimeEntry";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="p-5 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/timetracker" element={<TimeTracker />} />
            <Route path="/timeentry" element={<TimeEntry/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard"
              element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
            }/>

            <Route path="/clients"
              element={
              <ProtectedRoute>
              <Clients />
              </ProtectedRoute>
            }/>
            </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

