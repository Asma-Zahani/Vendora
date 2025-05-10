/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router";
import Logo from "@/assets/logo/logo.svg";
import Icon from "@/assets/logo/logo-ico.svg";
// import img from "@/assets/default/image.png";
import { useReactToPrint } from "react-to-print";
import JsBarcode from "jsbarcode";

const FactureModal = ({ onClose, facture }) => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
   
  useEffect(() => {
    if (facture?.facture_id) {
      JsBarcode("#barcode", facture.facture_id, {
        format: "CODE128",
        lineColor: "#000",
        width: 3,
        height: 40,
        displayValue: false,
      });
    }
  }, [facture]);

  const handlePrint = () => {
    reactToPrintFn();
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
          <div ref={contentRef} className="p-4 md:p-5 space-y-4 max-h-[70vh] overflow-y-auto scrollbar print:max-h-full print:overflow-visible">
            <div className="flex items-center justify-between">     
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <Link to="/" className="flex relative justify-center items-center">
                    <div className="absolute h-20 print:h-25 w-40 print:w-50 bg-cover bg-center rounded-md z-0 bg-image print:bg-gray-image"/>
                    <div style={{ backgroundImage: `url(${Icon})` }} className="absolute top-4.5 left-3 h-11 w-11 print:top-7 print:left-5 print:h-16 print:w-16 bg-cover bg-center rounded-md z-10 print:filter print:grayscale print:contrast-200 print:brightness-0"/>
                    <img src={Logo} alt="Logo" className="relative h-20 print:h-30 z-20" />
                  </Link>
                </div>
                <div className="block print:hidden text-sm text-gray-600 dark:text-gray-300">
                  <p>Rue El Omrane</p>
                  <p>5000 Monastir, Tunisie</p>
                </div>
              </div>
              <div className="hidden print:flex text-[80px] font-semibold font-fredoka mx-2">Facture</div>
              <div className="flex print:hidden mx-4 print:mt-2 print:mx-0 text-sm print:text-[8px] text-gray-600 dark:text-gray-300">
                <table className="table-fixed border-separate border-spacing-y-1">
                  <tbody>
                    <tr>
                      <td className="font-semibold w-24">Tél.</td>
                      <td>(+216) 55 555 555</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Email</td>
                      <td>vendora.shop.contact@gmail.com</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Site Web</td>
                      <td>https://vendora-app.vercel.app</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="hidden print:block">
              <div className="p-2  flex justify-between font-semibold">
                <div className="text-lg">DATE: {new Date(facture.created_at).toLocaleDateString()}</div>
                <div className="text-2xl">FACTURE N° : #{facture.facture_id}</div>
              </div>
              <div className="border-t p-2 flex justify-between">
                <div className="-space-y-1">
                  <p className="font-bold my-2">ÉMETTEUR :</p>
                  <p>(+216) 55 555 555</p>
                  <p>vendora.shop.contact@gmail.com</p>
                  <p>Rue El Omrane, Monastir Ville</p>
                  <p>Monastir, Tunisie</p>
                </div>
                <div className="-space-y-1 text-end max-w-80">
                  <p className="font-bold my-2">DESTINATAIRE :</p>
                  <p>{facture.telephone}</p>
                  <p>{facture.email}</p>
                  <p>{facture.adresse}, {facture.ville}</p>
                  <p>{facture.region}, Tunisie</p>
                </div>
              </div>
            </div>
            <div className="flex print:hidden justify-between text-sm border-y border-gray-200 dark:border-borderDark p-4 mb-6 text-gray-700 dark:text-gray-200">
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
            <div className="mt-6 py-2 flex flex-col w-full max-w-sm sm:max-w-[100%] max-h-[400px] overflow-y-auto">
              <div className="overflow-x-auto scrollbar">
                <table className="min-w-full">
                    <thead className="print:bg-[#cccccc] print:uppercase z-10 border-b print:border border-contentLight dark:border-borderDark print:border-black shadow-xs dark:shadow-borderDark">
                      <tr>
                        <th className="text-left px-4 py-3 print:border">Référence</th>
                        <th className="text-left px-4 py-3 print:border">Désignation</th>
                        <th className="text-left px-4 py-3 print:border">Qtité</th>
                        <th className="text-left px-4 py-3 print:border">PU TTC</th>
                        <th className="text-left px-4 py-3 print:border">R.</th>
                        <th className="text-left px-4 py-3 print:border">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facture.details_facture.map((detail) => {
                        return (
                          <tr key={detail.detail_facture_id} className="border-b print:border border-contentLight dark:border-borderDark print:border-black">
                            <td className="px-4 py-3 print:border">#{detail.produit.produit_id}</td>
                            <td className="px-4 py-3 print:border">
                              <div className="flex items-center space-x-2">
                                {/* {detail.produit.image && (
                                  <img src={detail.produit.image ? (`/produits/${detail.produit.image}`) : img} alt="image" onError={(e) => e.target.src = img} className="w-10 h-10 object-cover rounded" />
                                )} */}
                                <span>{detail.produit?.nom || "Produit inconnu"} {detail.couleur ? `- ${detail.couleur}` : ""}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 print:border">{detail.quantite}</td>
                            <td className="px-4 py-3 print:border">{detail.produit.prix}</td>
                            <td className="px-4 py-3 print:border">{detail.produit.promotion.reduction}</td>
                            <td className="px-4 py-3 print:border">{detail.totalLigneTTC}</td>
                          </tr>
                        );
                      })}                      
                    </tbody>
                </table>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <div className="space-y-3 w-full max-w-full">
                <div className="flex gap-3 px-3">
                  <span className="text-right font-semibold uppercase w-full">total HT :</span>
                  <span className="text-left w-1/3 sm:w-1/5">{facture?.totalHT} DT</span>
                </div>
                <div className="flex gap-3 px-3">
                  <span className="text-right font-semibold uppercase w-full">TVA (19%) :</span>
                  <span className="text-left w-1/3 sm:w-1/5">{(facture?.totalHT * facture?.tva / 100).toFixed(2)} DT</span>
                </div>
                <div className="flex gap-3 px-3">
                  <span className="text-right font-semibold uppercase w-full">Remise :</span>
                  <span className="text-left w-1/3 sm:w-1/5">{facture?.remise} %</span>
                </div>
                <div className="flex gap-3 px-3 text-lg font-bold uppercase print:py-2 print:bg-[#cccccc] print:border">
                  <span className="text-right w-full">Total :</span>
                  <span className="text-left w-1/3 sm:w-1/5">{facture?.totalTTC} DT</span>
                </div>
              </div>
            </div>
            <div className="hidden print:block">
              <div className="flex justify-between p-2 my-8">
                <div className="text-sm">
                  <p>Conditions générales de vente consultables sur le site:</p>
                  <p>https://vendora-app.vercel.app</p>
                  <svg className="-mb-7" id="barcode"></svg>
                </div>
                <div className="text-sm text-center">
                  <p>Cachet et signature de l&apos;entreprise :</p>
                  <div className="h-8 w-40 border-b mx-auto"></div>
                </div>
              </div>
              <p className="border-t text-center uppercase py-2">Merci de votre confiance - À bientôt sur Vendora !</p>
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