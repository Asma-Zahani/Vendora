import { useContext } from "react";
import UserContext from '@/utils/UserContext';
import ProfileMale from "@/assets/default/user_male.png";
import ProfileFemelle from "@/assets/default/user_femelle.png";

const PreferencesModal = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true"></div>

      <div className="relative w-full max-w-lg p-6" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
        <div className="bg-customLight dark:bg-customDark rounded-md shadow-md p-6 text-center">
          <div className="flex justify-center">
            <div className="w-30 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div className="bg-purpleLight h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
      
          <button type="button" className="transition-all duration-200 ease-linear rounded-full mt-12">
            <div className="bg-bgDark rounded-full w-25 h-25">
                {user?.genre === "Male" ? <img src={ProfileMale} alt="" className="w-full h-full rounded-full" /> : <img src={ProfileFemelle} alt="" className="w-full h-full rounded-full" />}
            </div>
          </button>
          
          <p className="text-xs mt-3">{user?.email}</p>

          <h2 className="text-2xl font-semibold mt-2">Bienvenue sur KD Marché</h2>
          <p className="text-2xl font-semibold my-2">{user?.prenom + ' ' + user?.nom} !</p>

          <div className="flex justify-center">
            <p className=" text-sm text-gray-600 my-6 max-w-xs">
              Vos réponses aux questions suivantes nous aideront à trouver des idées qui vous correspondent.
            </p>
          </div>

          <button className="w-full bg-purpleLight hover:bg-purpleLightHover text-white font-medium py-2 rounded-full">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;