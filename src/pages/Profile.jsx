import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Camera, Check, Loader2, Menu } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/api/profileapi";

export default function Profile() {
  const fileRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    companyName: "",
    gender: "",
    contact: "",
    address: "",
    state: "",
    country: "",
    avatar: "",
  });

  const { data: profileData, isLoading: isFetchingProfile, isFetching } =
    useGetProfileQuery();

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();

  useEffect(() => {
    setForm({
      name: "",
      lastName: "",
      companyName: "",
      gender: "",
      contact: "",
      address: "",
      state: "",
      country: "",
      avatar: "",
    });
  }, [user?._id]);

  useEffect(() => {
    if (!isFetching && profileData?.success && profileData?.data) {
      setForm({
        name: profileData.data.name || "",
        lastName: profileData.data.lastName || "",
        companyName: profileData.data.companyName || "",
        gender: profileData.data.gender || "",
        contact: profileData.data.contact || "",
        address: profileData.data.address || "",
        state: profileData.data.state || "",
        country: profileData.data.country || "",
        avatar: profileData.data.avatar || "",
      });
    }
  }, [profileData, isFetching]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!form.name.trim() || !form.lastName.trim()) {
      toast.error("First and Last name are required");
      return;
    }

    if (form.contact && !validatePhone(form.contact)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    try {
      await updateProfile(form).unwrap();
      toast.success("Profile updated successfully 🎉");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA] text-zinc-900 overflow-hidden font-sans relative">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="flex-1 flex flex-col relative z-10 h-full overflow-hidden">
        <Navbar />

        <div className="md:hidden px-6 py-4 flex items-center bg-white/60 backdrop-blur-xl border-b border-zinc-200/50 sticky top-0 z-20">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-white rounded-xl shadow-sm text-zinc-600 border border-zinc-100 active:scale-95 transition-all"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
          <span className="ml-4 font-bold text-zinc-800 tracking-tight">Profile Settings</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-10 lg:p-12 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="hidden md:block">
              <h1 className="text-3xl font-extrabold text-zinc-800">
                Profile Settings
              </h1>
              <p className="text-zinc-500 mt-1 text-sm">
                Manage your personal information.
              </p>
            </div>

            <div
              className={`bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border shadow-md overflow-hidden ${
                isFetching || isFetchingProfile ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="h-24 sm:h-32 bg-gradient-to-r from-indigo-50 to-purple-50 relative">
                <div className="hidden sm:block absolute top-6 right-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isUpdating}
                    className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                  >
                    {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              <div className="px-5 pb-8 sm:px-8 md:px-12 md:pb-10 relative">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 -mt-12 sm:-mt-16 mb-8 sm:mb-12">
                  <div
                    onClick={() => fileRef.current.click()}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white p-1 shadow-md cursor-pointer group"
                  >
                    <img
                      src={
                        form.avatar ||
                        `https://ui-avatars.com/api/?name=${form.name || "User"}&background=e0e7ff&color=4338ca&size=256`
                      }
                      alt="profile"
                      className="w-full h-full rounded-2xl object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-indigo-600 p-1.5 sm:p-2 rounded-full shadow-md">
                      <Camera size={16} className="text-white" />
                    </div>
                  </div>

                  <div className="pt-2 sm:pt-16 text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-800">
                      {form.name ? `${form.name} ${form.lastName}` : "User Profile"}
                    </h2>
                    <p className="text-zinc-500 text-sm sm:text-base mt-0.5">
                      {form.companyName || "No Company Added"}
                    </p>
                  </div>
                </div>

                <input type="file" ref={fileRef} onChange={handleImageChange} hidden accept="image/*" />

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <InputField label="First Name" name="name" value={form.name} onChange={handleChange} />
                  <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
                  <InputField label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} />
                  <InputField label="Contact Number" name="contact" value={form.contact} onChange={handleChange} />

                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 border border-zinc-200 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none md:appearance-auto"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <InputField label="Address" name="address" value={form.address} onChange={handleChange} />
                  <InputField label="State" name="state" value={form.state} onChange={handleChange} />
                  <InputField label="Country" name="country" value={form.country} onChange={handleChange} />
                </form>

                <div className="mt-8 sm:hidden">
                  <button
                    onClick={handleSubmit}
                    disabled={isUpdating}
                    className="w-full bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-zinc-50 border border-zinc-200 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}