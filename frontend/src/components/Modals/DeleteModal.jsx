/* eslint-disable react/prop-types */
import { useEffect } from "react"; 
import AOS from "aos";
import "aos/dist/aos.css";
import { CgClose } from "react-icons/cg";

const DeleteModal = ({ onClose, onConfirm, message }) => {
  
  useEffect(() => {
      AOS.init({ duration: 500, once: true });
      AOS.refresh();
    }, []);

  return (
    <div className={`fixed z-50 w-full h-full inset-0 flex items-center justify-center`}>
      <div className={`fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity`} aria-hidden="true"></div>
        <div className="relative p-4 w-full max-w-md max-h-full" data-aos="fade-down" data-aos-duration="500">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-[0px_0px_6px_0px] shadow-gray-200 dark:shadow-borderGrayDark">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 end-2.5 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center"
          >
            <CgClose size={20} />
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200 break-words text-wrap max-w-xs md:max-w-sm mx-auto whitespace-pre-wrap">
              {message || "Êtes-vous sûr de vouloir supprimer cet élément ?"}
            </h3>
            <div className="flex items-center rounded-b dark:border-gray-600 justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="border border-purpleLight text-purpleLight text-[14px] py-2 px-6 rounded-md"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="bg-purpleLight dark:bg-purpleDark text-white dark:text-purpleLight text-[14px] py-2 px-6 rounded-md"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
