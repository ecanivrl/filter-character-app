const LoadingCircularProgress = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-t-4 border-transparent border-t-pink-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-transparent border-t-white opacity-50 animate-ping"></div>
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingCircularProgress;
