import React from "react";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router";

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
      navigate("/login");
      reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-6 rounded-xl border border-purple-200">
      <h2 className="text-3xl font-bold text-center mb-4 text-purple-600">
        Reset Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <label className="block mb-2 font-medium text-gray-700">
          Email Address
        </label>

        <input
          type="email"
          className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
        />

        {/* Error Message */}
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Success Message */}
        {isSubmitSuccessful && (
          <p className="text-green-600 text-sm mb-2">
            A password reset link has been sent to your email.
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold mt-2 disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
