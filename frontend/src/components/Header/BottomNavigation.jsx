import { UserContext } from "@/utils/UserContext";
import { useLocation } from "react-router-dom";
import { Heart, Home, Moon, ShoppingCart, Sun } from "lucide-react";
import ThemeContext from '@/utils/ThemeContext';
import { useContext } from "react";
import { Link } from "react-router";

const BottomNavigation = () => {
    const location = useLocation();
    const { user, wishlist, panier } = useContext(UserContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const links = [
        { to: "/", label: "Home", icon: <Home className="w-5 h-5 stroke-2 group-hover:text-purpleLight" />, type: "link" },
        { to: "/cart", label: "Panier", icon: <ShoppingCart className="w-5 h-5 stroke-2 group-hover:text-purpleLight" />, type: "link", badge: panier?.length },
        { to: "/wishlist", label: "Favoris", icon: <Heart className="w-5 h-5 stroke-2 group-hover:text-purpleLight" />, type: "link", badge: wishlist?.length },
        { to: "#", label: "Mode", icon: theme === "light" ? <Moon className="w-5 h-5 stroke-2" /> : <Sun className="w-5 h-5 stroke-2 group-hover:text-purpleLight" />, type: "button" },
    ];

    const isActive = (path) => location.pathname === path;

    const handleModeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-customLight dark:bg-customDark dark:border-t dark:border-borderDark">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">

                {links.map((link, index) => (
                    link.type === "link" ? (
                        <Link key={index} to={link.to} className={`relative inline-flex flex-col items-center justify-center px-5 group ${isActive(link.to) ? "text-purpleLight" : "hover:bg-gray-50 dark:hover:bg-bgDark"}`}>
                            {link.icon}
                            {user && link.badge > 0 && (
                                <span className="absolute top-1 right-11 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full">
                                    {link.badge}
                                </span>
                            )}
                            <span className={`text-sm ${isActive(link.to) ? "text-purpleLight dark:text-purpleLight" : "text-gray-500 dark:text-gray-400 group-hover:text-purpleLight"}`}>
                                {link.label}
                            </span>
                        </Link>
                    ) : (
                        <button key={index} type="button" onClick={handleModeToggle} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-bgDark group">
                            {link.icon}
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-purpleLight">
                                {link.label}
                            </span>
                        </button>
                    )
                ))}

            </div>
        </div>
    );
};

export default BottomNavigation;
