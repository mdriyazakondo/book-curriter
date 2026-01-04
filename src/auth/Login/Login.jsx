import { FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const { loginUserFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = async (data) => {
    try {
      const result = await loginUserFunc(data.email, data.password);
      const user = result.user;

      await axiosSecure.post(`/users`, {
        email: data.email,
      });

      Swal.fire({
        title: `Welcome ${user.displayName || user.email}!`,
        text: "Login successful",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
      navigate(from, { replace: true });
      reset();
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
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200 w-full max-w-xl border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 mb-2">
            Welcome <span className="text-emerald-600">Back</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1"
            >
              Email Address
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
              <FaEnvelope className="text-slate-400 mr-3" />
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="example@mail.com"
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1"
            >
              Password
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
              <FaLock className="text-slate-400 mr-3" />
              <input
                {...register("password", { required: true })}
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forget-password text-sm">
              <span className="text-slate-500 hover:text-emerald-600 font-bold transition-colors">
                Forget Password?
              </span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-200 active:scale-95 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100"></span>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
            <span className="bg-white px-4 text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleLogin />

        <p className="text-slate-500 text-center mt-8 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-bold hover:underline transition-all"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
