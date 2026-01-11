import React from "react";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      // Success message sweetalert diyeo dekhate paren, ekhane reset logic rakha holo
      reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200 dark:shadow-none w-full max-w-md border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            Reset <span className="text-emerald-600">Password</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Enter your email to receive a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <div
              className={`flex items-center bg-slate-50 dark:bg-slate-800 border ${
                errors.email
                  ? "border-rose-300 dark:border-rose-900"
                  : "border-slate-200 dark:border-slate-700"
              } rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all`}
            >
              <FaEnvelope className="text-slate-400 dark:text-slate-500 mr-3" />
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {isSubmitSuccessful && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-4 rounded-xl">
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold text-center">
                ✓ A password reset link has been sent to your email.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900/20 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-bold transition-all"
          >
            <FaArrowLeft size={12} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
