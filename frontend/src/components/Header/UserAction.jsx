/* eslint-disable react/prop-types */
import { ChevronDown, Home, Truck, User, Package, LogIn, LogOut } from 'lucide-react';
import ProfileMale from "@/assets/default/user_male.png";
import ProfileFemelle from "@/assets/default/user_femelle.png";
import { handleLogout } from "@/service/EntitesService";
import { UserContext } from '@/utils/UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import ConfirmModal from "@/components/Modals/ConfirmModal";

const UserAction = ({ home }) => {
    const { user, setUser, setToken } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} onMouseEnter={() => setOpen(true)} onClick={() => setOpen(!open)} className={`relative ${home ? "hidden sm:flex" : "flex"} items-center dark:border-borderDark pl-4 -my-4`}>
            <button type="button" className="inline-block p-0 transition-all duration-200 ease-linear rounded-full">
                <div className="bg-bgDark rounded-full w-8 h-8 md:w-[39px] md:h-[39px]">
                    {user.genre === "Male" ? <img src={ProfileMale} alt="" className="w-full h-full rounded-full" /> : <img src={ProfileFemelle} alt="" className="w-full h-full rounded-full" />}
                </div>
            </button>

            {!home && (
                <div className="lg:flex hidden flex-col items-start justify-center pl-2">
                    <span className="font-semibold text-sm leading-4">{user.prenom + ' ' + user.nom}</span>
                    <div className="flex items-center gap-1 text-xs leading-6">
                        <p className="cursor-pointer">{user.role}</p>
                        <ChevronDown className="text-center cursor-pointer" size={12} />
                    </div>
                </div>
            )}

            {open && (
                <div onMouseLeave={() => setOpen(false)} className={`absolute flex flex-col bg-contentLight dark:bg-contentDark shadow-md mt-2 p-2 rounded w-48 z-10 top-[60px] ${home ? "right-[-20px]" : "right-[0px]"}`}>
                    <div className="px-4 py-2">
                        <span className="block text-sm text-gray-900 dark:text-white">{user.prenom + ' ' + user.nom}</span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                    </div>

                    <hr className="border-gray-300 dark:border-gray-600 my-2" />

                    <ul className="pb-2">
                        {user.role !== "client" && (
                            <>
                                <li className="block px-4 py-2 text-sm text-gray-700 hover:scale-110 dark:text-gray-200 dark:hover:text-white">
                                    <Link to={`${user.role === "admin" ? "/dashboard" : user.role === "livreur" ? "/dashboardLivreur" : "/dashboardResponsable"}`} className="flex leading-4 cursor-pointer">
                                        <Home size={15} className="mr-2" /> Dashboard
                                    </Link>
                                </li>
                                {user.role === "admin" && (
                                    <>
                                        <li className="block px-4 py-2 text-sm text-gray-700 hover:scale-110 dark:text-gray-200 dark:hover:text-white">
                                            <Link to="/dashboardLivreur" className="flex leading-4 cursor-pointer">
                                                <Truck size={15} className="mr-2" /> Dashboard Livreur
                                            </Link>
                                        </li>
                                        <li className="block px-4 py-2 text-sm text-gray-700 hover:scale-110 dark:text-gray-200 dark:hover:text-white">
                                            <Link to="/dashboardResponsable" className="flex leading-4 cursor-pointer">
                                                <Truck size={15} className="mr-2" /> Dashboard Responsable
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        )}

                        <li className="block px-4 py-2 text-sm text-gray-700 hover:scale-110 dark:text-gray-200 dark:hover:text-white">
                            <Link to="/updateProfile" className="flex leading-4 cursor-pointer">
                                <User size={15} className="mr-2" /> Mon compte
                            </Link>
                        </li>

                        <li className="block px-4 py-2 text-sm text-gray-700 hover:scale-110 dark:text-gray-200 dark:hover:text-white">
                            <Link to="/orderHistory" className="flex leading-4 cursor-pointer">
                                <Package size={15} className="mr-2" /> Mes commandes
                            </Link>
                        </li>

                        <li className="block px-4 py-2 text-sm text-gray-700 hover:scale-110 dark:text-gray-200 dark:hover:text-white">
                            <div onClick={() => setIsOpen(true)} className="w-full">
                                <button className="flex items-center w-full">
                                    <LogIn size={15} className="mr-2" /> Se déconnecter
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
            {isOpen && <ConfirmModal isOpen={isOpen} icon={<LogOut />} onClose={() => setIsOpen(false)} message="Êtes-vous sûr de vouloir vous déconnecter ?" onConfirm={(e) => { e.preventDefault(); handleLogout(setUser, setToken); }}/>}
        </div>
    );
};

export default UserAction;
