import { useContext } from "react";
import UserContext from '@/utils/UserContext';
import Footer from "../../../Footer/Footer";
import Profile from "@/assets/dashboard/profile.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CircleUserRound, Gift, History, Key, LogOut } from "lucide-react";

const Account = () => {
    const { user, token, setUser, setToken } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();
    
        const res = await fetch('api/logout', {
          method: 'post',
          headers: { Authorization: `Bearer ${token}` }
        })
        if(res.ok){
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
          navigate('/');
        }
      }

    return (
        <div>
            <section className="mx-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
                    {/* Profil */}
                    <div className="col-span-1 w-full py-2">
                        <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                            <div className="grid grid-cols-1 gap-4 rounded-lg">
                                <div className="flex gap-3">
                                    <button type="button" className="transition-all duration-200 ease-linear rounded-full">
                                        <div className="bg-bgDark rounded-full w-16 h-16">
                                            <img src={Profile} alt="" className="w-full h-full rounded-full" />
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
                                            <form onSubmit={handleLogout}>
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

            <Footer />
        </div>
    );
};

export default Account;
