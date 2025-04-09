// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";

// const Modal = ({ isOpen, onClose, children }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="relative bg-white dark:bg-customDark p-6 rounded-2xl shadow-2xl w-full max-w-4xl mx-4"
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-3 right-4 text-gray-500 hover:text-red-500 transition-colors"
//               aria-label="Fermer"
//             >
//               <X size={26} />
//             </button>
//             {children}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Modal;
