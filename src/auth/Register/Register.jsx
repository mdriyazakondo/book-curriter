import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosPhotos } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isShow, setShow] = useState(false);
  const { createUserFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleRegister = async (data) => {
    const imageFile = data.photo[0];
    const images = await imageUpload(imageFile);

    try {
      const userData = {
        name: data.name,
        email: data.email,
        image: images,
      };

      const result = await createUserFunc(data.email, data.password);
      const user = result.user;

      await updateProfile(user, {
        displayName: data.name,
        photoURL: images,
      });

      await axiosSecure.post("/users", userData);

      Swal.fire({
        title: `Welcome ${user.displayName}!`,
        text: "Registration successful",
        icon: "success",
        confirmButtonColor: "#10b981",
      });

      navigate(from, { replace: true });
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Registration Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200 dark:shadow-none w-full max-w-xl border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
            Create <span className="text-emerald-600">Account</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Join BookCourier and start your reading journey
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
       
          <div className="flex flex-col">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
              Full Name
            </label>
            <div
              className={`flex items-center bg-slate-50 dark:bg-slate-800 border ${
                errors.name
                  ? "border-rose-300 dark:border-rose-900"
                  : "border-slate-200 dark:border-slate-700"
              } rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all`}
            >
              <FaUser className="text-slate-400 dark:text-slate-500 mr-3" />
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="John Doe"
                className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium"
              />
            </div>
            {errors.name && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">
                {errors.name.message}
              </p>
            )}
          </div>

        
          <div className="flex flex-col">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
              Profile Photo
            </label>
            <div
              className={`flex items-center bg-slate-50 dark:bg-slate-800 border ${
                errors.photo
                  ? "border-rose-300 dark:border-rose-900"
                  : "border-slate-200 dark:border-slate-700"
              } rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all`}
            >
              <IoIosPhotos className="text-slate-400 dark:text-slate-500 mr-3" />
              <input
                {...register("photo", { required: "Photo is required" })}
                type="file"
                className="w-full bg-transparent outline-none text-slate-500 dark:text-slate-400 text-xs file:hidden cursor-pointer font-medium"
              />
            </div>
            {errors.photo && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">
                {errors.photo.message}
              </p>
            )}
          </div>

      
          <div className="flex flex-col">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <div
              className={`flex items-center bg-slate-50 dark:bg-slate-800 border ${
                errors.email
                  ? "border-rose-300 dark:border-rose-900"
                  : "border-slate-200 dark:border-slate-700"
              } rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all`}
            >
              <FaEnvelope className="text-slate-400 dark:text-slate-500 mr-3" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="example@mail.com"
                className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium"
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">
                {errors.email.message}
              </p>
            )}
          </div>

      
          <div className="flex flex-col">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
              Security Password
            </label>
            <div
              className={`flex items-center bg-slate-50 dark:bg-slate-800 border ${
                errors.password
                  ? "border-rose-300 dark:border-rose-900"
                  : "border-slate-200 dark:border-slate-700"
              } rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all`}
            >
              <FaLock className="text-slate-400 dark:text-slate-500 mr-3" />
              <input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "Include 1 upper, 1 lower, 1 number & 1 symbol",
                  },
                })}
                type={isShow ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShow(!isShow)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none ml-2"
              >
                {isShow ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900/20 mt-4 active:scale-95"
          >
            Register Now
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 dark:text-slate-500 font-bold">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleLogin />

        <p className="text-slate-500 dark:text-slate-400 text-center mt-8 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
