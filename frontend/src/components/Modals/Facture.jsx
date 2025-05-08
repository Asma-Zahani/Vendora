/* eslint-disable react/prop-types */
import { useContext, useRef } from "react";
import ThemeContext from '@/utils/ThemeContext';
import { CgClose } from "react-icons/cg";
import { Link } from "react-router";
import logo from "@/assets/logo/logo.svg";
import LightBgLogo from "@/assets/logo/bg-logo-light.png";
import DarkBgLogo from "@/assets/logo/bg-logo-dark.png";
import Icon from "@/assets/logo/logo-ico.svg";
import img from "@/assets/default/image.png";

const FactureModal = ({ onClose, facture }) => {
  const { theme } = useContext(ThemeContext);
  const printRef = useRef(null);

  const handlePrint = () => {
    if (printRef.current) {
      window.print();
    }
  };

  return (
    <>
    <div className={`fixed z-[9999] w-full h-full inset-0 flex items-center justify-center`}>
      <div className={`fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity`} aria-hidden="true"></div>
      <div className="relative p-4 w-full max-w-5xl max-h-full" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-[0px_0px_6px_0px] shadow-gray-200 dark:shadow-borderGrayDark">
          <button onClick={onClose} className="absolute top-3 end-2.5 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center no-print">
            <CgClose size={20} />
          </button>
          <div ref={printRef} className="p-4 md:p-5 space-y-4 max-h-[70vh] overflow-y-auto scrollbar">
            <div className="flex justify-between items-start mb-6">
              <div>
                <Link to="/" className="relative flex justify-center items-center">
                  <div style={{ backgroundImage: `url(${theme === "light" ? LightBgLogo : DarkBgLogo})` }} className="absolute h-20 w-40 bg-cover bg-center rounded-md z-0"/>
                  <div style={{ backgroundImage: `url(${Icon})` }} className="absolute top-4.5 left-3 h-11 w-11 bg-cover bg-center rounded-md z-10"/>
                  <img src={logo} alt="Logo" className="relative h-20 z-20" />
                </Link>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>Rue El Omrane</p>
                  <p>5000 Monastir, Tunisie</p>
                </div>
              </div>
              {/* <div className="mx-10 text-right text-sm text-gray-600 dark:text-gray-300">
                <p><strong>Email:</strong> vendora.shop.contact@gmail.com</p>
                <p><strong>Website:</strong> https://vendora-app.vercel.app</p>
                <p><strong>Téléphone:</strong> (216) 55 555 555</p>
              </div> */}
            </div>
            <div className="flex justify-between text-sm border-y border-gray-200 dark:border-borderDark p-4 mb-6 text-gray-700 dark:text-gray-200">
              <div><strong>Facture No.:</strong> #{facture.facture_id}</div>
              <div><strong>Date:</strong> {new Date(facture.created_at).toLocaleDateString()}</div> 
              <div>
                <strong>Status Paiement:</strong>{" "}
                {facture?.transaction_id ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Payé</span>
                ) : (
                  <span className="bg-bgRed dark:bg-bgRedDark text-red-500 px-2 py-1 rounded">Non Payé</span>
                )}
              </div>
              <div><strong>Total TTC:</strong> {facture.totalTTC} DT</div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {facture?.drive_id ? "ADRESSE DE RETRAIT" : "ADRESSE DE LIVRAISON"}
              </p>
            </div>
            <div className="mt-6 py-2 flex flex-col w-full max-w-sm sm:max-w-[100%] max-h-[400px] overflow-y-auto">
              <div className="overflow-x-auto scrollbar">
                <table className="min-w-full">
                    <thead className="sticky top-0 bg-customLight dark:bg-customDark z-10 border-b border-contentLight dark:border-borderDark shadow-xs dark:shadow-borderDark">
                      <tr>
                      <th className="text-left px-4 py-3">Référence</th>
                        <th className="text-left px-4 py-3">Désignation</th>
                        <th className="text-left px-4 py-3">Quantité</th>
                        <th className="text-left px-4 py-3">PU TTC</th>
                        <th className="text-left px-4 py-3">R.</th>
                        <th className="text-left px-4 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facture.details_facture.map((detail) => {
                        return (
                          <tr key={detail.detail_facture_id} className="border-b border-contentLight dark:border-borderDark">
                            <td className="px-4 py-3">#{detail.produit.produit_id}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                {detail.produit.image && (
                                  <img src={detail.produit.image ? (`/produits/${detail.produit.image}`) : img} alt="image" onError={(e) => e.target.src = img} className="w-10 h-10 object-cover rounded" />
                                )}
                                <span>{detail.produit?.nom || "Produit inconnu"} {detail.couleur ? `- ${detail.couleur}` : ""}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">{detail.quantite}</td>
                            <td className="px-4 py-3">{detail.produit.prix}</td>
                            <td className="px-4 py-3">{detail.produit.promotion.reduction}</td>
                            <td className="px-4 py-3">{detail.totalLigneTTC}</td>
                          </tr>
                        );
                      })}                      
                    </tbody>
                </table>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600 dark:text-gray-200 space-y-1 mb-6">
              <p><strong>Total HT:</strong> {facture?.totalHT} DT</p>
              <p><strong>TVA:</strong> {facture?.tva} %</p>
              <p className="text-lg font-semibold"><strong>TTC:</strong> {facture?.totalTTC} DT</p>
            </div>
          </div>
          <div className="flex items-center p-4 md:p-5 rounded-b dark:border-gray-600 justify-end no-print">
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="border border-purpleLight text-purpleLight text-[14px] py-2 px-6 rounded-md">
                Annuler
              </button>
              <button type="button" onClick={handlePrint} className="bg-purpleLight dark:bg-purpleDark text-white dark:text-purpleLight text-[14px] py-2 px-6 rounded-md">
                Imprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FactureModal;