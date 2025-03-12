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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6">
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
        <h1 className="text-xl font-semibold mb-4">test test</h1>
        <div className="flex items-center justify-center">
          test
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