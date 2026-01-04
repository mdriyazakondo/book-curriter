const Loading = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center bg-transparent">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-100 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute shadow-lg shadow-emerald-100"></div>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <p className="text-slate-900 text-lg font-black tracking-tight">
          Book<span className="text-emerald-600">Courier</span>
        </p>
        <div className="flex gap-1 mt-2">
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
