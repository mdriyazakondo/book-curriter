import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading/Loading";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils";
import { FaUser } from "react-icons/fa";
import { IoIosPhotos } from "react-icons/io";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isProfile, setIsProfile] = useState(false);
  const {
    data: userInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      return data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const handleProfileUpdate = async (data) => {
    try {
      Swal.fire({
        title: "Updating...",
        text: "Synchronizing your profile",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      let imageURL = image;

      if (data.photo && data.photo.length > 0) {
        imageURL = await imageUpload(data.photo[0]);
      }

      await updateProfile(user, {
        displayName: data.name,
        photoURL: imageURL,
      });

      const updateData = {
        name: data.name,
        image: imageURL,
      };

      const res = await axiosSecure.patch(`/users/${userInfo._id}`, updateData);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Changes saved successfully.",
          confirmButtonColor: "#10b981",
        });

        refetch();
        reset();
        setIsProfile(false);
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "Profile is already up to date.",
          confirmButtonColor: "#0f172a",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not sync profile information.",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  if (isLoading) return <Loading />;

  const { name, email, image, create_date, last_loggedIn, role } = userInfo;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="h-32 bg-slate-900 w-full relative">
          <div className="absolute -bottom-12 left-8">
            <img
              src={image}
              alt="Profile"
              className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg object-cover bg-white"
            />
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-slate-900">{name}</h2>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                  {role}
                </span>
              </div>
              <p className="text-slate-500 font-medium">{email}</p>
            </div>

            {!isProfile && (
              <button
                onClick={() => setIsProfile(true)}
                className="bg-slate-900 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-emerald-100 active:scale-95"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Member Since
              </p>
              <p className="text-sm font-bold text-slate-700 mt-1">
                {new Date(create_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Last Activity
              </p>
              <p className="text-sm font-bold text-slate-700 mt-1">
                {new Date(last_loggedIn).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isProfile && (
        <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/60 border border-slate-100 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900">
              Update Information
            </h3>
            <button
              onClick={() => setIsProfile(false)}
              className="text-slate-400 hover:text-rose-500 font-bold text-xs uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>

          <form
            onSubmit={handleSubmit(handleProfileUpdate)}
            className="space-y-5"
          >
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1"
              >
                Display Name
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                <FaUser className="text-slate-400 mr-3" />
                <input
                  {...register("name")}
                  type="text"
                  defaultValue={userInfo?.name}
                  id="name"
                  className="w-full bg-transparent outline-none text-slate-900 text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="photo"
                className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1"
              >
                New Profile Photo
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                <IoIosPhotos className="text-slate-400 mr-3" />
                <input
                  {...register("photo")}
                  type="file"
                  id="photo"
                  className="w-full bg-transparent outline-none text-slate-500 text-xs file:hidden cursor-pointer font-medium"
                />
              </div>
            </div>

            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
