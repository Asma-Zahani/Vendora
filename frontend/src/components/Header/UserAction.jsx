/* eslint-disable react/prop-types */
import { ChevronDown, User, LogIn } from 'lucide-react';
import ProfileMale from "@/assets/default/user_male.png";
import ProfileFemelle from "@/assets/default/user_femelle.png";
import { handleLogout } from "@/service/AuthService";
import { UserContext } from '@/utils/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router';

const UserAction = ({ home }) => {
    const { user, setUser, setToken } = useContext(UserContext);

    return (
        <div className="relative group flex items-center dark:border-borderDark pl-4 -my-4">
            <button type="button" className="inline-block p-0 transition-all duration-200 ease-linear rounded-full">
                <div className="bg-bgDark rounded-full w-[29px] h-[29px] md:w-[39px] md:h-[39px] lg:w-[39px] lg:h-[39px]">
                    {user.genre === "Male"
                        ? <img src={ProfileMale} alt="" className="w-full h-full rounded-full" />
                        : <img src={ProfileFemelle} alt="" className="w-full h-full rounded-full" />}
                </div>
            </button>

            {home ? (
                <div className="lg:flex hidden flex-col items-start justify-center pl-4 -my-3">
                    <span className="text-md">{user.prenom + ' ' + user.nom}</span>
                </div>
            ) : (
                <div className="lg:flex hidden flex-col items-start justify-center pl-2">
                    <span className="font-semibold text-sm leading-4">{user.prenom + ' ' + user.nom}</span>
                    <div className="flex items-center gap-1 text-xs leading-6">
                        <p className="cursor-pointer">{user.role}</p>
                        <ChevronDown className="text-center cursor-pointer" size={12} />
                    </div>
                </div>
            )}

            <ul className={`absolute hidden group-hover:flex flex-col bg-contentLight dark:bg-contentDark shadow-md mt-2 p-2 rounded w-48 z-10 top-[60px] ${home ? "right-[-20px]" : "right-[0px]"}`}>
                <Link to={"/updateProfile"} className="flex items-center py-3 px-4 leading-4 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] cursor-pointer border-b dark:border-[#3D3D3D]">
                    <User size={15} className="mr-2" /> Mon compte
                </Link>

                <li className="flex items-center py-3 px-4 leading-4 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] cursor-pointer">
                    <form onSubmit={(e) => { e.preventDefault(); handleLogout(setUser, setToken); }} className="w-full">
                        <button className="flex items-center w-full">
                            <LogIn size={15} className="mr-2" /> Se déconnecter
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    );
};

export default UserAction;