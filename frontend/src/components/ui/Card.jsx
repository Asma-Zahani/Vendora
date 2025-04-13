import { Check } from "lucide-react";
import { useState } from "react";
import defaultImg from "@/assets/default/image.png";

/* eslint-disable react/prop-types */
const Card = ({ data, path, nom, isSelected, onClick }) => {
    const [imageError, setImageError] = useState(false);
    const imageUrl = imageError || !(path + data.image) ? defaultImg : path + data.image;
  
    return (
      <div onClick={onClick} style={{ backgroundImage: `url(${imageUrl})` }} className={`relative w-32 h-32 max-w-xs overflow-hidden shadow-lg cursor-pointer rounded-lg bg-cover bg-center group`}>
        <img src={path + data.image} onError={() => setImageError(true)} className="hidden" />

        <div className="absolute bottom-0 left-0 right-0 text-left text-sm py-2 px-2 z-10">
          {nom}
        </div>
  
        {isSelected && (
          <>
            <div className="absolute inset-0 bg-contentDark opacity-40 rounded-lg z-10"></div>
            <div className="absolute top-2 right-2 z-20">
              <div className="p-1 bg-purpleLight rounded-lg">
                <Check size={12} color="white" strokeWidth={3} />
              </div>
            </div>
          </>
        )}
  
        <div className={`absolute inset-0 rounded-lg ${isSelected ? 'border-2 border-purpleLight' : 'border-2 border-transparent group-hover:border-purpleLight'} z-30 pointer-events-none`}>
          <div className={`absolute inset-0 rounded-md ${isSelected ? 'border-[3px] border-customLight dark:border-customDark' : 'border-[3px] border-transparent group-hover:border-customLight dark:group-hover:border-customDark'}`}/>
        </div>
      </div>
    );
  };

export default Card;