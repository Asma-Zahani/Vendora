import { useState } from "react";
import { FaEye } from "react-icons/fa";
import ViewModal from "@/components/Products/ViewModal";

const ViewProduct = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="text-gray-700 dark:text-white hover:text-purple-500 dark:hover:text-purple-400"
      >
        <FaEye className="w-6 h-6" />
      </button>
      <ViewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        label={product.title}
        viewData={product}
      />
    </div>
  );
};

export default ViewProduct;
