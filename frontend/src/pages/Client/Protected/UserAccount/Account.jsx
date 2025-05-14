import { useContext } from "react";
import UserContext from '@/utils/UserContext';
import ProfileMale from "@/assets/default/user_male.png";
import ProfileFemelle from "@/assets/default/user_femelle.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CircleUserRound, Gift, History, Key, LayoutDashboard, LogOut } from "lucide-react";
import { handleLogout } from "@/service/EntitesService";

const Account = () => {
    const { user, setUser, setToken } = useContext(UserContext);
    const location = useLocation();

    return (
        <div>
            <section className="sm:mx-6 sm:py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
                    {/* Profil */}
                    <div className="col-span-1 w-full py-2">
                        <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                            <div className="grid grid-cols-1 gap-4 rounded-lg">
                                <div className="flex gap-3">
                                    <button type="button" className="transition-all duration-200 ease-linear rounded-full">
                                        <div className="bg-bgDark rounded-full w-16 h-16">
                                            {user.genre === "Male" ? <img src={ProfileMale} alt="" className="w-full h-full rounded-full" /> : <img src={ProfileFemelle} alt="" className="w-full h-full rounded-full" />}
                                        </div>
                                    </button>
                                    <div className="flex items-center">
                                        <span className="text-2xl">{user.prenom + ' ' + user.nom}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                                        <li>
                                            <Link to="/updateProfile" className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${location.pathname === "/updateProfile" ? "bg-purpleLight text-white" : "bg-contentLight hover:text-gray-900 dark:bg-contentDark dark:hover:text-white"}`}>
                                                <CircleUserRound className="w-5 h-5 me-2" />
                                                Information compte
                                            </Link>
                                        </li>
                                        {user.role !== "client" &&
                                            <li>
                                                <Link to={`${user.role === "admin" ? "/dashboard" : user.role === "livreur" ? "/dashboardLivreur" : "/dashboardResponsable"}`} className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${location.pathname === "/dashboard" ? "bg-purpleLight text-white" : "bg-contentLight hover:text-gray-900 dark:bg-contentDark dark:hover:text-white"}`}>
                                                    <LayoutDashboard className="w-5 h-5 me-2" />
                                                    Dashboard
                                                </Link>
                                            </li>
                                        }
                                        <li>
                                            <Link to="/orderHistory" className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${location.pathname === "/orderHistory" ? "bg-purpleLight text-white" : "bg-contentLight hover:text-gray-900 dark:bg-contentDark dark:hover:text-white"}`}>
                                                <History className="w-5 h-5 me-2" />
                                                Historique commandes
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/offres" className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${location.pathname === "/offres" ? "bg-purpleLight text-white" : "bg-contentLight hover:text-gray-900 dark:bg-contentDark dark:hover:text-white"}`}>
                                                <Gift className="w-5 h-5 me-2" />
                                                Offres
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/updatePassword" className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${location.pathname === "/updatePassword" ? "bg-purpleLight text-white" : "bg-contentLight hover:text-gray-900 dark:bg-contentDark dark:hover:text-white"}`}>
                                                <Key className="w-5 h-5 me-2" />
                                                Modifier mot de passe
                                            </Link>
                                        </li>
                                        <li>
                                            <form onSubmit={(e) => {e.preventDefault();handleLogout(setUser, setToken);}}>
                                                <button className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${location.pathname === "/logout" ? "bg-purpleLight text-white" : "bg-contentLight hover:text-gray-900 dark:bg-contentDark dark:hover:text-white"}`}>
                                                    <LogOut className="w-5 h-5 me-2" />
                                                    Déconnexion
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenu principal avec Outlet */}
                    <div className="col-span-2 w-full">
                        <Outlet />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Account;
