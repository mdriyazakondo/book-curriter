import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";
import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

const Navbar = () => {
  const location = useLocation();
  const [role] = useRole();
  const navigate = useNavigate();
  const { user, logoutUserFunc, loading } = useAuth();

  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const isActive = (path) =>
    location.pathname === path
      ? "text-emerald-600 border-b-2 border-emerald-600"
      : "text-slate-600 dark:text-slate-300 hover:text-emerald-500 font-medium transition-colors";

  const links = (
    <>
      {["/", "/all-books", "/contacts", "/dashboard"].map((path) => (
        <li key={path} className="mx-1 list-none">
          <Link
            to={path}
            className={`${isActive(
              path
            )} px-3 py-2 text-sm uppercase tracking-wider block`}
          >
            {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 left-0 right-0 z-9999 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-[1500px] mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="hover:scale-105 transition-transform duration-300">
            <Logo />
          </div>
        </div>

        <div className="hidden lg:flex items-center">
          <ul className="flex items-center gap-2">{links}</ul>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-yellow-400 transition-colors"
          >
            {isDark ? (
              <HiSun className="text-xl" />
            ) : (
              <HiMoon className="text-xl" />
            )}
          </button>

          {loading ? (
            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
                  {role}
                </p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                  {user?.displayName || "Member"}
                </p>
              </div>

              <div className="relative group">
                <button className="w-10 h-10 rounded-full border-2 border-emerald-100 dark:border-emerald-900 overflow-hidden shadow-inner">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={logoutUserFunc}
                    className="w-full text-left px-4 py-2 text-sm text-rose-500 font-semibold hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-slate-700 dark:text-slate-300 font-bold hover:text-emerald-600 transition-colors text-sm uppercase tracking-wide"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-slate-900 dark:bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
