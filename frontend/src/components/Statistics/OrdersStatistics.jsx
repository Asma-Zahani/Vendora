import BarChart from "@/components/Charts/BarChart";

const OrdersStatistics = () => {
  const data = {
  labels:  ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
  datasets: [
    {
      label: 'Livrée',
      data: [50, 35, 20, 50, 35, 10, 50, 35, 30, 50, 35, 50],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: '#665292FF',
      // backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
    {
      label: 'Livrée',
      data: [50, 35, 20, 50, 35, 10, 50, 35, 30, 50, 35, 50],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: '#665292FF',
      // backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
    {
      label: 'Livrée',
      data: [50, 35, 20, 50, 35, 10, 50, 35, 30, 50, 35, 50],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: '#665292FF',
      // backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
    {
      label: 'Livrée',
      data: [50, 35, 20, 50, 35, 10, 50, 35, 30, 50, 35, 50],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: '#665292FF',
      // backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
  ],
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Statistiques genres */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Statut des commandes</h1>
        <div className="flex items-center justify-center">
          <BarChart data={data} />
        </div>
      </div>

      {/* Statistiques âges */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
        <h1 className="text-xl font-semibold mb-4">test test</h1>
        <div className="flex items-center justify-center">
          test
        </div>
      </div>
    </div>
  );
};

export default OrdersStatistics;
