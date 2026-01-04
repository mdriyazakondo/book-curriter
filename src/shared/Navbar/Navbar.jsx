import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const location = useLocation();
  const [role] = useRole();
  const navigate = useNavigate();
  const { user, logoutUserFunc, loading } = useAuth();

  // Color Palette: Navy (Slate-900) + Emerald-600 (Success/Active)
  const isActive = (path) =>
    location.pathname === path
      ? "text-emerald-600 border-b-2 border-emerald-600"
      : "text-slate-600 hover:text-emerald-500 font-medium transition-colors";

  const links = (
    <>
      <li className="mx-1">
        <Link
          to="/"
          className={`${isActive(
            "/"
          )} px-3 py-2 text-sm uppercase tracking-wider`}
        >
          Home
        </Link>
      </li>
      <li className="mx-1">
        <Link
          to="/all-books"
          className={`${isActive(
            "/all-books"
          )} px-3 py-2 text-sm uppercase tracking-wider`}
        >
          All Books
        </Link>
      </li>
      <li className="mx-1">
        <Link
          to="/contacts"
          className={`${isActive(
            "/contacts"
          )} px-3 py-2 text-sm uppercase tracking-wider`}
        >
          Contact
        </Link>
      </li>
      {role === "customer" && (
        <li className="mx-1">
          <Link
            to="/dashboard/wish-list"
            className={`${isActive(
              "/dashboard/wish-list"
            )} px-3 py-2 text-sm uppercase tracking-wider`}
          >
            Wishlist
          </Link>
        </li>
      )}
      <li className="mx-1">
        <Link
          to="/dashboard"
          className={`${isActive(
            "/dashboard"
          )} px-3 py-2 text-sm uppercase tracking-wider`}
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Logging out?",
      text: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669", // Emerald Green
      cancelButtonColor: "#f43f5e", // Rose/Red
      confirmButtonText: "Yes, Logout",
    });

    if (!confirm.isConfirmed) return;

    try {
      await logoutUserFunc();
      Swal.fire({
        title: "Logged Out",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, icon: "error" });
    }
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-9999 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="navbar max-w-[1500px] mx-auto px-4">
        {/* Mobile Menu & Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden text-slate-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-4 shadow-2xl bg-white rounded-box w-64 border border-slate-50 gap-2"
            >
              {links}
            </ul>
          </div>
          <div className="hover:scale-105 transition-transform duration-300">
            <Logo />
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2">{links}</ul>
        </div>

        <div className="navbar-end gap-4">
          {loading ? (
            <span className="loading loading-ring loading-md text-emerald-600"></span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
                  {role}
                </p>
                <p className="text-xs font-bold text-slate-800 tracking-tight">
                  {user?.displayName || "Member"}
                </p>
              </div>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar border-2 border-emerald-100 p-0.5"
                >
                  <div className="w-10 rounded-full shadow-inner">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"
                      }
                      alt="profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-1 p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-xl w-44 border border-slate-100"
                >
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-rose-500 font-bold hover:bg-rose-50"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-slate-700 font-bold hover:text-emerald-600 transition-colors text-sm uppercase tracking-wide"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-100"
              >
                Register Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
