import NotFoundLogo from '@/assets/notFound/404NotFound.svg'; 

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-center py-0 sm:py-12 md:py-16 lg:py-0">
      <div className="flex flex-col items-center">
        <div className="mb-12 sm:mb-10 md:mb-14">
          <img src={NotFoundLogo} className="logo" alt="Vite logo" />
        </div>
        <div className="w-full px-4 md:px-8">
          <h3 className="font-bold text-2xl md:text-3xl mb-4 sm:mb-6 text-gray-800 dark:text-white">
            Internal Server Error
          </h3>
          <p className="font-sans text-base md:text-lg mb-6 sm:mb-8 text-gray-600 dark:text-white">
            The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved.
          </p>
          <a className="text-white rounded-md text-sm px-6 py-3 sm:text-base bg-purpleLight hover:bg-[#553d7a] transition duration-300">
            BACK TO HOME PAGE
          </a>
        </div>
      </div>
    </div>
  );
};


export default PageNotFound;