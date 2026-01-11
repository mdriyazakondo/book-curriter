import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const GoogleLogin = () => {
  const { googleUserFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleGoogleLogin = async () => {
    try {
      const result = await googleUserFunc();
      const user = result.user;
      if (!user) return;

      const userData = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      await axiosSecure.post("/users", userData);

      Swal.fire({
        title: `Welcome ${user.displayName}!`,
        text: "Login successful",
        icon: "success",
        confirmButtonColor: "#10b981",
      });

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 active:scale-[0.98] cursor-pointer"
    >
      <FaGoogle className="text-rose-500 text-lg dark:text-rose-400" />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
