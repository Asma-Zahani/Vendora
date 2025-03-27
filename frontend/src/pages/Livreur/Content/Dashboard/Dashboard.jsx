import { Home } from "lucide-react";
import Header from "@/pages/Livreur/Content/Header";

export const Dashboard = () => {

  const orders = [
    { id: "#320", client: "Asma Zh", type: "Livraison" },
    { id: "#322", client: "Sophie M.", type: "Livraison" },
    { id: "#324", client: "Nadia K.", type: "Livraison" },
    { id: "#325", client: "Asma Zh", type: "Livraison" },
    { id: "#327", client: "Sophie M.", type: "Livraison" }
  ];

  return (
    <>
      <Header title="Tableau de bord" icon={Home} parent="Tableau de bord" />
      <section className="mx-6 py-6 space-y-7">
        <div className="grid grid-cols-1 gap-y-6">
          <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
            <h1 className="text-xl font-semibold mb-4">Commandes en attente</h1>
            <div className="max-h-[350px] overflow-y-auto scrollbar relative">
              <table className="min-w-full">
                <thead className="sticky top-0 bg-customLight dark:bg-customDark z-10 border-b border-contentLight dark:border-borderDark shadow-xs dark:shadow-borderDark">
                  <tr>
                    <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Num °</th>
                    <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Client</th>
                    <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-contentLight dark:border-borderDark">
                      <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200">{order.id}</td>
                      <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200">{order.client}</td>
                      <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200">{order.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>    
      </section>
    </>
  );
};