/* eslint-disable react/prop-types */
import BarChart from "@/components/Charts/BarChart";
import { Link } from 'react-router';

const OrdersStatistics = ({ labels, statistiquesCommandes }) => {  
  const data = {
    labels:  labels,
    datasets: [
      { 
        ...statistiquesCommandes[0],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      { 
        ...statistiquesCommandes[1],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      { 
        ...statistiquesCommandes[2],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],  
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6">
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Commandes en attente</h1>
        <div className="max-h-[350px] overflow-y-auto scrollbar relative">
          {statistiquesCommandes?.commandesEnAttente?.length > 0 &&
            <table className="min-w-full">
              <thead className="sticky top-0 bg-customLight dark:bg-customDark z-10 border-b border-contentLight dark:border-borderDark shadow-xs dark:shadow-borderDark">
                <tr>
                  <th className="py-3.5 pr-2 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Num°</th>
                  <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Client</th>
                  <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Type</th>
                </tr>
              </thead>
              <tbody>
                {statistiquesCommandes.commandesEnAttente.map((commande) => (
                  <tr key={commande.commande_id} className="border-b border-contentLight dark:border-borderDark">
                    <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200"><Link to={commande.commande_livraison ? "/commandesLivraison" : "/commandesRetraitDrive"}>#{commande.commande_id}</Link></td>
                    <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200">{commande.client.prenom + " " + commande.client.nom}</td>
                    <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200">{commande.commande_livraison ? "Livraison" : "Retrait Drive"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>

      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full sm:col-span-2">
        <h1 className="text-xl font-semibold mb-4">Statut des commandes</h1>
        <div className="flex items-center justify-center">
          <BarChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default OrdersStatistics;