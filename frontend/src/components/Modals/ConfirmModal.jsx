/* eslint-disable react/prop-types */
import { CgClose } from "react-icons/cg";
// import { CircleAlert } from "lucide-react";
import React from "react";

const ConfirmModal = ({ onClose, onConfirm, message, icon }) => {
  return (
    <div className={`fixed z-50 w-full h-full inset-0 flex items-center justify-center`}>
      <div className={`fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity`} aria-hidden="true"></div>
        <div className="relative p-4 w-full max-w-md max-h-full" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-[0px_0px_6px_0px] shadow-gray-200 dark:shadow-borderGrayDark">
          <button onClick={onClose} type="button" className="absolute top-3 end-2.5 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center">
            <CgClose size={20} />
          </button>
          <div className="p-4 md:p-5 text-center">
            {icon && React.cloneElement(icon, {
              className: "mx-auto mb-4 text-gray-500 dark:text-gray-200",
              size: 56,
            })}
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200 break-words text-wrap max-w-xs md:max-w-sm mx-auto whitespace-pre-wrap">
              {message || "Êtes-vous sûr de vouloir supprimer cet élément ?"}
            </h3>
            <div className="flex items-center rounded-b dark:border-gray-600 justify-center gap-3">
              <button type="button" onClick={onClose} className="border border-purpleLight text-purpleLight text-[14px] py-2 px-6 rounded-md">
                Annuler
              </button>
              <button type="button" onClick={onConfirm} className="bg-purpleLight dark:bg-purpleDark text-white dark:text-purpleLight text-[14px] py-2 px-6 rounded-md">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
