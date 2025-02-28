import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import defaultImg from "@/assets/default/image.png";

const ViewProduct = ({ produit, isOpen, closeModal }) => {
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);
  const [couleurs, setCouleurs] = useState([]); // Stocke les couleurs disponibles

  useEffect(() => {
    if (isOpen) {
      // Utilisation de fetch à la place d'axios
      fetch(`http://127.0.0.1:8000/api/produits/${produit.produit_id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur réseau lors de la récupération des couleurs');
          }
          return response.json();
        })
        .then(data => {
          setCouleurs(data.couleurs); // Utilisation de la structure correcte de la réponse
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des couleurs:", error);
        });
    }
  }, [isOpen, produit.produit_id]);

  const handleImageError = () => {
    setImageSrc(defaultImg);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-bgLight" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img
                    src={imageSrc}
                    alt={produit.nom}
                    onError={handleImageError}
                    className="w-full h-auto rounded-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{produit.nom}</h3>
                    <p className="text-gray-600 mt-2">{produit.description}</p>
                    <div className="flex items-center mt-3 space-x-2">
                      <span className="text-lg font-bold text-purple-600">${produit.prix}</span>
                      {produit.promotion_id && (
                        <span className="text-gray-400 line-through">${produit.prix}</span>
                      )}
                    </div>

                    {/* Section des couleurs */}
                    <div className="mt-4">
  <h4 className="font-medium">Select Color:</h4>
  <div className="flex space-x-2 mt-2">
    {couleurs.length > 0 ? (
      couleurs.map((couleur) => (
        <button
          key={couleur.couleur_id}
          className="w-8 h-8 rounded-full border border-gray-300"
          style={{ backgroundColor: couleur.code_hex }}
        />
      ))
    ) : (
      <p>No colors available or error fetching data</p>
    )}
  </div>
</div>


                    <div className="mt-4">
                      <h4 className="font-medium">Quantity:</h4>
                      <input
                        type="number"
                        defaultValue={1}
                        min={1}
                        className="w-16 p-1 border rounded-md"
                      />
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Add to Cart</button>
                      <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={closeModal}>Close</button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewProduct;
