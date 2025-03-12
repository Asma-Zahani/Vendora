import DoughnutChart from "@/components/Charts/DoughnutChart";

const UsersStatistics = () => {
  const dataGenre = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full sm:col-span-2">
          <div className="flex items-center justify-center h-100">
            <div className="flex flex-col max-w-lg">
              Commandes récentes
            </div>
          </div>
      </div>

      {/* Statistiques genres - premier élément */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
          <div className="flex flex-col h-100">
          <h1 className="text-xl font-semibold mb-4">Statistiques genres</h1>
            <div className="flex items-center justify-center">
                <DoughnutChart data={dataGenre} />
            </div>
          </div>
      </div>

      {/* Statistiques genres - deuxième élément */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
          <div className="flex flex-col h-100">
          <h1 className="text-xl font-semibold mb-4">Statistiques age</h1>
            <div className="flex items-center justify-center">
                <DoughnutChart data={dataGenre} />
            </div>
          </div>
      </div>

      {/* Statistiques genres - troisième élément */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
          <div className="flex flex-col h-100">
          <h1 className="text-xl font-semibold mb-4">Statistiques emploi</h1>
            <div className="flex items-center justify-center">
                <DoughnutChart data={dataGenre} />
            </div>
          </div>
      </div>

      {/* Statistiques genres - quatrième élément */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
          <div className="flex flex-col h-100">
          <h1 className="text-xl font-semibold mb-4">Statistiques des mode de connexion</h1>
            <div className="flex items-center justify-center">
                <DoughnutChart data={dataGenre} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default UsersStatistics;