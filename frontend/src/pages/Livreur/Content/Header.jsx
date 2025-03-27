/* eslint-disable react/prop-types */
const Header = ({ title, icon: Icon, parent, current }) => {
  return ( 
    <div className="bg-customLight dark:bg-customDark m-0 pt-12 lg:pt-20 md:pt-20 sm:pt-16">
      <div className="flex flex-col sm:flex-row justify-between px-0 py-2 lg:px-4 lg:py-4 md:px-4 md:py-4 mx-auto dark:shadow-none"> 
        <div className="px-8 py-2">
          <h1 className="font-bold text-xl dark:text-white tracking-wide">{title}</h1>
        </div>
        <div className="flex items-center pl-10 text-sm pr-5">
          <div className="mr-1 p-2 bg-bgLight dark:bg-bgDark rounded-md text-purpleLight">
            {Icon && <Icon size={17} />}
          </div>
          <span className="ml-2 font-semibold font-sans text-purpleLight"> / {parent} </span>
          {current && <span className="ml-2 font-sans text-purpleLight"> / {current} </span>}
        </div>
      </div>
    </div>
  );
};
export default Header;
