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
      className="w-full flex items-center justify-center gap-3 py-4 border border-slate-200 rounded-2xl bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 active:scale-[0.98]"
    >
      <FaGoogle className="text-rose-500 text-lg" />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
