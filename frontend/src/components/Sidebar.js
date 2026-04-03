import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-gray-100 w-60 h-screen p-3">

      <ul className="space-y-2">

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Clients
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Projects
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Tasks
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/timetracker"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Time Tracker
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/timeentry"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Time Entry
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Login
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Signup
          </NavLink>
        </li>

       {/*  <li className="px-4 py-2 text-gray-400">Invoices</li>
        <li className="px-4 py-2 text-gray-400">Settings</li> */}

      </ul>

    </div>
  );
}

export default Sidebar;
