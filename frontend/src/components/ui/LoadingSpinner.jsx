const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex justify-center items-center">
        {/* Cercle moyen (s'affiche après le premier et grandit) */}
        <div className="absolute w-12 h-12 border-2 border-purpleLight rounded-full animate-ping opacity-50 animate-delay-200"></div>
        {/* Petit cercle (s'affiche en dernier, puis grandit) */}
        <div className="absolute w-8 h-8 border-2 border-purpleLight rounded-full animate-ping opacity-100"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
