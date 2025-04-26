import Image from "@/assets/home/Online shopping.svg";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="relative bg-customLight dark:bg-customDark m-0">
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                      Meilleur endroit pour choisir <br /> vos <span className="text-purpleLight">vêtements</span></h1>
                    
                    <p className="mt-3 text-gray-600 dark:text-gray-400">Découvrez une large sélection de vêtements tendance, qualité et confort au meilleur prix. Trouvez ce que vous aimez en quelques clics !</p>
                    <Link to={"/boutique"}>
                      <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-purpleLight rounded-lg lg:w-auto hover:bg-purpleLightHover focus:outline-none focus:bg-purpleLightHover">
                        Achetez Maintenant
                      </button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <img className="w-full h-full lg:max-w-3xl" src={Image} alt="Catalogue-pana.svg" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;