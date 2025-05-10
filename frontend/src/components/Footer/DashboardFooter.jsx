const Footer = () => {
  return (
    <footer className={`w-full relative bg-customLight dark:bg-customDark border-t border-contentLight dark:border-borderDark dark:shadow-none`}>
      <div className="px-4 py-4 ml-3 text-sm flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-1">
        <div className="flex items-center">
          Copyright {new Date().getFullYear()} © Vendora™.
        </div>
        <div>Fabriqué à la main & fait avec ❤️</div>
      </div>
    </footer>
  );
};

export default Footer;
