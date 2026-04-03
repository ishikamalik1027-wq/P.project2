import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">

      {/* LEFT SIDE (ICON + NAME) */}
      <h1 className="text-xl font-bold flex items-center gap-2">
        <i className="fa-brands fa-upwork text-blue-500"></i>
        FreelanceFlow
      </h1>

      {/* RIGHT SIDE (LOGOUT) */}
      <button
        onClick={logout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;

