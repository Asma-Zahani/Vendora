import { useState, useEffect } from "react";
import Img1 from "@/assets/home/hero.jpeg";
import Img2 from "@/assets/home/hero2.jpeg";

const Hero = () => {
  const images = [
    { src: Img1,
      title: "Lolo Drive - Achetez et Récupérez en Magasin",
      text: "Sélectionnez un point de vente près de chez vous, achetez en ligne et récupérez vos produits en magasin.",
      button: "Trouver un Point de Vente"
    },
    { src: Img2, 
      title: "FaZZa - Votre E-Commerce",
      text: "Explorez notre large sélection de produits et recevez vos achats directement chez vous avec notre service de livraison rapide." ,
      button: "Explorer FaZZa"
    }
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleIndicatorClick = (index) => {
    if (index !== currentImage) {
      setCurrentImage(index);
    }
  };

  return (
    <div className="relative bg-customLight dark:bg-customDark m-0">
      <div className="relative w-full h-[620px] overflow-hidden">
        <div className="absolute z-20 w-full h-full flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentImage * 100}%)` }} >
          {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <div className="w-full h-full bg-cover bg-center"style={{ backgroundImage: `url(${image.src})`, filter: "blur(5px)" }}></div>
              <div className="absolute top-0 left-0 w-full h-[620px] bg-opacity-50 dark:bg-opacity-80 z-10 "></div>
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-violet-950 z-20">
                <div className="max-w-[400px] lg:max-w-[620px] mx-auto">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {image.title}
                  </h1>
                  <p className="mt-4 text-sm text-violet-950">
                    {image.text}
                  </p>
                  <button className="bg-purpleLight text-white text-[14px] py-2 px-6 mt-4 rounded-md hover:bg-opacity-90 transition duration-150" type="submit">
                    {image.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button key={index} onClick={() => handleIndicatorClick(index)} aria-label={`Slide ${index + 1}`}
            className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${ index === currentImage ? "bg-purpleLight dark:bg-purpleLight" : "bg-bgLight dark:bg-purpleDark" }`}></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
