import BarChart from "@/components/Charts/BarChart";

const OrdersStatistics = () => {
  const data = {
    labels:  ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Expédiée',
        data: [40, 60, 80, 120, 150, 130, 170, 180, 160, 140, 100, 90],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Livrée',
        data: [30, 50, 70, 110, 140, 125, 165, 175, 155, 135, 95, 85],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Annulée',
        data: [10, 20, 15, 30, 25, 20, 18, 22, 19, 25, 30, 35],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],  
  };

  const orders = [
    { id: "#320", client: "Asma Zh", type: "Livraison" },
    { id: "#321", client: "Mohamed Ali", type: "Retrait Drive" },
    { id: "#322", client: "Sophie M.", type: "Livraison" },
    { id: "#323", client: "Karim B.", type: "Retrait Drive" },
    { id: "#324", client: "Nadia K.", type: "Livraison" },
    { id: "#325", client: "Asma Zh", type: "Livraison" },
    { id: "#326", client: "Mohamed Ali", type: "Retrait Drive" },
    { id: "#327", client: "Sophie M.", type: "Livraison" },
    { id: "#328", client: "Karim B.", type: "Retrait Drive" },
    { id: "#329", client: "Nadia K.", type: "Livraison" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6">
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