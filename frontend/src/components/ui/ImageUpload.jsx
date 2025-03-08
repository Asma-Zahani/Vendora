/* eslint-disable react/prop-types */
import { Upload, X } from "lucide-react";
import { useState, useEffect } from "react";
import img from "@/assets/default/image.png";

const ImageUpload = ({ label, name, value, onChange }) => {
  const [preview, setPreview] = useState(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
  };

  useEffect(() => {
    if (value) {
      const imageUrl = `/${label}/${value}`;
      setPreview(imageUrl);      
    }
  }, [value, label]);

  return (
    <div className="flex flex-col items-center gap-3 mt-1">
      {preview ? (
        <div className="relative w-40 h-40">
          <img src={preview ? preview : img} alt="Preview" onError={(e) => e.target.src = img} className="w-full h-full object-cover rounded-md border border-gray-300 dark:border-borderDark" />
          <button onClick={handleRemoveImage} type="button" className="absolute top-2 right-2 bg-purpleLight text-white text-sm px-1 py-1 rounded-md">
            <X size={17} />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-between cursor-pointer bg-customLight dark:bg-contentDark dark:text-grayDark border border-gray-300 dark:border-borderDark px-4 py-2 rounded-md w-full">
          <input type="file" name={name} accept="image/*" onChange={handleImageChange} className="hidden" />
          Choisir une image
          <Upload size={17} />
        </label>
      )}
      {value && !preview && <p className="text-sm text-gray-600 dark:text-gray-400">{value}</p>}
    </div>
  );
};

export default ImageUpload;
