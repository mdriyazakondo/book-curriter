import React from "react";
import {
  FiMail,
  FiPhone,
  FiSend,
  FiMapPin,
  FiMessageCircle,
} from "react-icons/fi";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for sending message
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-1000 transition-colors">
      <div className="bg-white dark:bg-slate-900 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] dark:shadow-2xl rounded-[40px] max-w-5xl w-full overflow-hidden flex flex-col lg:flex-row border border-slate-100 dark:border-slate-800">
        {/* Left Side: Contact Information */}
        <div className="lg:w-2/5 bg-slate-900 dark:bg-slate-800/50 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Background Circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-[4px] mb-6">
              <FiMessageCircle size={14} /> Reach Out
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-6">
              Let's Start a <br />
              <span className="text-emerald-400">Conversation.</span>
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-10">
              Have a question about a book or our library services? Our team is
              here to help you.
            </p>

            <div className="space-y-8">
              {/* Contact Item */}
              <div className="flex items-start gap-5">
                <div className="bg-slate-800 dark:bg-slate-700/50 p-4 rounded-2xl text-emerald-400">
                  <FiMail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Email Us
                  </p>
                  <p className="text-lg font-bold truncate">
                    support@emerald-library.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-slate-800 dark:bg-slate-700/50 p-4 rounded-2xl text-emerald-400">
                  <FiPhone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Call Us
                  </p>
                  <p className="text-lg font-bold">+880 1234 567 890</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-slate-800 dark:bg-slate-700/50 p-4 rounded-2xl text-emerald-400">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    Visit Us
                  </p>
                  <p className="text-lg font-bold">Dhanmondi, Dhaka, BD</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 relative z-10">
            <p className="text-slate-500 text-sm font-medium italic">
              "A library is not a luxury but one of the necessities of life."
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:w-3/5 p-10 md:p-16 bg-white dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  required
                />
              </div>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                Your Message
              </label>
              <textarea
                rows="5"
                placeholder="Tell us more about your inquiry..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500 transition-all resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-slate-900 dark:hover:bg-emerald-500 text-white font-black uppercase tracking-[2px] py-5 rounded-2xl transition-all shadow-lg shadow-emerald-100 dark:shadow-none active:scale-95 group"
            >
              <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
