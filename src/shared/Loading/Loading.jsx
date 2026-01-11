const Loading = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center bg-transparent transition-colors duration-500">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-100 dark:border-slate-800 rounded-full transition-colors"></div>

        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute shadow-lg shadow-emerald-100 dark:shadow-none"></div>

        <div className="absolute w-8 h-8 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full animate-pulse"></div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <p className="text-slate-900 dark:text-white text-lg font-black tracking-tight transition-colors">
          Book
          <span className="text-emerald-600 dark:text-emerald-500">
            Currier
          </span>
        </p>

        <div className="flex gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full animate-bounce"></span>
          <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        </div>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-[3px] text-slate-400 dark:text-slate-600 animate-pulse">
        Loading Assets
      </p>
    </div>
  );
};

export default Loading;
