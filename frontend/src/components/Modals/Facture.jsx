/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from '@/utils/ThemeContext';
import { getEntities } from "@/service/EntitesService";
import logo from "@/assets/logo/logo.svg";
import img from "@/assets/default/image.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from "react-router";
import LightBgLogo from "@/assets/logo/bg-logo-light.png";
import DarkBgLogo from "@/assets/logo/bg-logo-dark.png";

const FactureModal = ({ isOpen, onClose, selectedItem }) => {
  const { theme } = useContext(ThemeContext);

  const [facture, setFacture] = useState(null);
  const [details, setDetails] = useState([]);
  const [produits, setProduits] = useState([]);
  const printRef = useRef(null);

  useEffect(() => {
    const fetchFactureDetails = async () => {
      if (!selectedItem) return;

      try {
        const allFactures = await getEntities("factureCommandes");
        const factureAssociee = allFactures.find(f => f.commande_id === selectedItem.commande_id);
        setFacture(factureAssociee);

        if (factureAssociee) {
          const allDetails = await getEntities("detailFactures");
          const detailsAssocies = allDetails.filter(d => d.facture_id === factureAssociee.facture_id);
          setDetails(detailsAssocies);

          if (detailsAssocies) {
            const allProduits = await getEntities("produits");
            const produitsAssocies = allProduits.filter(p =>
              detailsAssocies.some(d => d.produit_id === p.produit_id)
            );
            setProduits(produitsAssocies);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de facture :", error);
      }
    };

    fetchFactureDetails();
  }, [selectedItem]);

  if (!isOpen) return null;

  

  const handlePrint = () => {
    if (printRef.current) {
      window.print();
    }
  };

  const handleDownload = async () => {
    const input = printRef.current;
    if (!input) return;
  
    // 🔁 Sauvegarde les styles originaux
    const originalOverflow = input.style.overflow;
    const originalMaxHeight = input.style.maxHeight;
  
    // 🔧 Ajuster temporairement les styles
    input.style.overflow = 'visible';
    input.style.maxHeight = 'none';
    input.classList.add('oklch-color-fix');
  
    try {
    const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        windowWidth: document.body.scrollWidth,
        scrollY: -window.scrollY // évite les coupures liées au scroll
        });
          
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const margin = 10;
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);
      pdf.save(`facture-${facture?.facture_id || 'download'}.pdf`);
    } catch (error) {
      console.error("Erreur lors du téléchargement de la facture :", error);
    } finally {
      // ✅ Restaure les styles
      input.style.overflow = originalOverflow;
      input.style.maxHeight = originalMaxHeight;
      input.classList.remove('oklch-color-fix');
    }
  };
  
  

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [driveInfo, setDriveInfo] = useState(null);

  useEffect(() => {
    const fetchDriveInfo = async () => {
      if (selectedItem?.drive_id) {
        try {
          const allDrives = await getEntities("drives");
          const drive = allDrives.find(d => d.drive_id === selectedItem.drive_id);
          setDriveInfo(drive);
        } catch (error) {
          console.error("Erreur lors de la récupération des données de retrait :", error);
        }
      }
    };

    fetchDriveInfo();
  }, [selectedItem]); 

  return (
    <>
    <style>{`
      @media print {
        .no-print {
          display: none !important;
        }
      }
    `}</style>
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-[9999] p-4">
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-5xl relative max-h-[90vh] overflow-y-auto">
        {/* Bouton X pour fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold no-print"
        >
          ×
        </button>

        {/* Contenu imprimable */}
        <div ref={printRef} className="w-full overflow-visible max-h-none">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 border-b pb-6">
            <div>
              <Link to="/" className="relative"> 
                <img src={logo} alt="Logo" className="h-20 mb-2 relative z-10" />
                <div style={{ backgroundImage: `url(${theme === "light" ? LightBgLogo : DarkBgLogo})` }} className="absolute inset-0 bg-cover bg-center z-0"></div>
              </Link>
              <address className="not-italic text-sm text-gray-600 dark:text-gray-300">
                <p>1982 Harvest Lane</p>
                <p>New York, NY 12210</p>
                <p>United States</p>
              </address>
            </div>
            <div className="text-right text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Email:</strong> fazza.shop.contact@gmail.com</p>
              <p><strong>Website:</strong> www.KDMarché.com</p>
              <p><strong>Téléphone:</strong> (216) 55 555 555</p>
            </div>
          </div>

          {/* Facture Info */}
          <div className="flex justify-between text-sm border-y py-4 mb-6 text-gray-700 dark:text-gray-200">
            <div><strong>Facture No.:</strong> #{facture?.facture_id}</div>
            <div><strong>Date:</strong> {new Date(facture?.created_at).toLocaleDateString()}</div>
            <div>
              <strong>Status Paiement:</strong>{" "}
              {selectedItem?.etatCommande === "Livrée" ? (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Payé</span>
              ) : (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Non Payé</span>
              )}
            </div>
            <div><strong>Total TTC:</strong> {facture?.totalTTC} €</div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedItem?.drive_id ? "ADRESSE DE RETRAIT" : "ADRESSE DE LIVRAISON"}
              </p>
              <h4 className="text-base font-semibold">
                {selectedItem?.drive_id
                  ? driveInfo?.ville || "Ville de retrait inconnue"
                  : selectedItem?.ville_livraison}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {selectedItem?.drive_id
                  ? driveInfo?.region || "Région de retrait inconnue"
                  : selectedItem?.region_livraison}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {selectedItem?.drive_id
                  ? driveInfo?.adresse|| "Adresse de retrait inconnue"
                  : selectedItem?.adresse_livraison}
              </p>
            </div>
          </div>


          {/* Tableau des Produits */}
          <table className="w-full table-auto border-collapse mb-6">
            <thead className="bg-purple-600 text-white text-sm">
              <tr>
                <th className="text-left px-4 py-3">Produit</th>
                <th className="text-left px-4 py-3">Quantité</th>
                <th className="text-left px-4 py-3">Couleur</th>
                <th className="text-left px-4 py-3">Prix Unitaire TTC</th>
                <th className="text-left px-4 py-3">Total Ligne TTC</th>
              </tr>
            </thead>
            <tbody>
              {details.map((detail) => {
                const produit = produits.find(p => Number(p.produit_id) === Number(detail.produit_id));
                return (
                  <tr key={detail.detail_facture_id} className="bg-gray-50 border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        {produit?.image && (
                          <img src={produit.image ? (`/produits/${produit.image}`) : img} alt="image" onError={(e) => e.target.src = img} className="w-10 h-10 object-cover rounded" />
                        )}
                        <span>{produit?.nom || "Produit inconnu"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{detail.quantite}</td>
                    <td className="px-4 py-3">{detail.couleur}</td>
                    <td className="px-4 py-3">{detail.prixUnitaireTTC} €</td>
                    <td className="px-4 py-3">{detail.totalLigneTTC} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Résumé */}
          <div className="text-right text-sm text-gray-700 dark:text-gray-200 space-y-1 mb-6">
            <p><strong>Total HT:</strong> {facture?.totalHT} €</p>
            <p><strong>TVA:</strong> {facture?.tva} %</p>
            <p className="text-lg font-semibold"><strong>Total TTC:</strong> {facture?.totalTTC} €</p>
          </div>
        </div>

        {/* Boutons - non imprimables */}
        <div className="flex justify-end space-x-2 mt-4 no-print">
          <button onClick={handlePrint} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
            Imprimer
          </button>
          <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            Télécharger
          </button>
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
            Fermer
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default FactureModal;
