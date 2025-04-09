import React, { useEffect, useState } from "react";
import axios from "axios";

const FacturePDF = ({ facture }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!facture) return;

    const fetchDetails = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/detailFactures");
        const filteredDetails = response.data.filter(
          (detail) => detail.facture_id === facture.facture_id
        );
        setDetails(filteredDetails);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des détails");
        setLoading(false);
        console.error(err);
      }
    };

    fetchDetails();
  }, [facture]);
  

  if (!facture) return null;

  if (loading) return <div className="text-center">Chargement des détails...</div>;

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-black/40 backdrop-blur-sm bg-white p-6 rounded-lg shadow-lg mt-3">
      <h2 className="text-2xl font-semibold text-gray-800">Facture {facture.facture_id}</h2>
      <div className="mt-4">
        <p className="text-lg">Date : {new Date(facture.created_at).toLocaleDateString()}</p>
        <p className="text-lg">Commande ID : {facture.commande_id}</p>
        <p className="text-lg">TVA : {facture.tva}%</p>
        <p className="text-lg">Total HT : {facture.totalHT} €</p>
        <p className="text-lg">Total TTC : {facture.totalTTC} €</p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Détails de la facture</h3>
        <table className="min-w-full table-auto mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Produit ID</th>
              <th className="py-2 px-4 text-left">Quantité</th>
              <th className="py-2 px-4 text-left">Prix Unitaire</th>
              <th className="py-2 px-4 text-left">Total HT</th>
              <th className="py-2 px-4 text-left">TVA</th>
              <th className="py-2 px-4 text-left">Total TTC</th>
            </tr>
          </thead>
          <tbody>
            {details.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-2 px-4">
                  Aucun détail trouvé
                </td>
              </tr>
            ) : (
              details.map((detail) => (
                <tr key={detail.detail_facture_id}>
                  <td className="py-2 px-4">{detail.produit_id}</td>
                  <td className="py-2 px-4">{detail.quantite}</td>
                  <td className="py-2 px-4">{detail.prix_unitaire} €</td>
                  <td className="py-2 px-4">{detail.totalLigneHT} €</td>
                  <td className="py-2 px-4">{detail.tvaLigne} %</td>
                  <td className="py-2 px-4">{detail.totalLigneTTC} €</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default FacturePDF;
