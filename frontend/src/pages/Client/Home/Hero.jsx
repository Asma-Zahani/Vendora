import LightImage from "@/assets/home/Online shopping 1.svg";
import DarkImage from "@/assets/home/Online shopping 2.svg";
import { Link } from "react-router";
import { useContext } from "react";
import ThemeContext from '@/utils/ThemeContext';

const Hero = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="relative bg-customLight dark:bg-customDark m-0">
      <div className="container px-6 py-20 mx-auto">
        <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Le meilleur endroit pour trouver <br /> tous vos <span className="text-purpleLight">articles</span> préférés</h1>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      Découvrez une large sélection d&apos;articles tendance alliant qualité, confort et prix avantageux. Trouvez ce que vous aimez en quelques clics!
                    </p>
                    <Link to={"/boutique"}>
                      <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-purpleLight rounded-lg lg:w-auto hover:bg-purpleLightHover focus:outline-none focus:bg-purpleLightHover">
                        Achetez Maintenant
                      </button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img className="w-full h-full lg:max-w-3xl" src={theme === "light" ? LightImage : DarkImage} alt="Catalogue-pana.svg" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;