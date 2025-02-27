import { useContext } from 'react'
import { Sun, Moon } from 'lucide-react';
import ThemeContext from '@/utils/ThemeContext';

const DarkMode = () => {

  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div className="relative">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-10 h-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110"
      >
        {theme === "light" ? (
          <Moon className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-0" />
        ) : (
          <Sun className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]" />
        )}
      </button>
    </div>
  );
}

export default DarkMode
