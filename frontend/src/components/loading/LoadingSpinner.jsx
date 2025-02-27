const LoadingSpinner = ({ children, isLoading, active = false }) => {
    return (
      <>
        {children}
        {isLoading && (
          <div
            className={`absolute ${
              active
                ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                : "top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.3)]"
            }`}
          >
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </>
    );
  };
  
  export default LoadingSpinner;
  