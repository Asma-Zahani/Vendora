import PropTypes from 'prop-types';

const Header = ({ title, icon: Icon, parent, current }) => {
  return ( 
    <div className="bg-customLight dark:bg-customDark m-0 pt-12 lg:pt-20 md:pt-20 sm:pt-16">
      <div className="flex flex-col sm:flex-row justify-between px-0 py-2 lg:px-4 lg:py-4 md:px-4 md:py-4 mx-auto dark:shadow-none"> 
        <div className="px-8 py-2">
          <h1 className="font-bold text-xl dark:text-white tracking-wide">{title}</h1>
        </div>
        {/* 
        <div className="hidden lg:flex space-x-4">
          <button className="p-2 rounded-md text-gray-600 dark:text-grayDark hover:text-purpleLight dark:hover:text-purpleLight hover:bg-bgLight hover:dark:bg-bgDark">General</button>
          <button className="p-2 rounded-md text-gray-600 dark:text-grayDark hover:text-purpleLight dark:hover:text-purpleLight hover:bg-bgLight hover:dark:bg-bgDark">Applications</button>
        </div>
        */}
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

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  parent: PropTypes.string,
  current: PropTypes.string,
};

export default Header;
