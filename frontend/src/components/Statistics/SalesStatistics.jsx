/* eslint-disable react/prop-types */
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import AreaChart from "@/components/Charts/AreaChart";

const SalesStatistics = ({labels, selectedYear, statistiquesVentes }) => {
  const objectifTotalVentes = 10000;
  const objectifNombreCommandes = 100;
  const objectifRevenuParCommande = 200;

  const pourcentageVentes = Math.min((statistiquesVentes.totalDesVentes / objectifTotalVentes) * 100, 100);
  const pourcentageCommandes = Math.min((statistiquesVentes.nombreCommandes / objectifNombreCommandes) * 100, 100);
  const pourcentageRevenu = Math.min((statistiquesVentes.revenuParCommande / objectifRevenuParCommande) * 100, 100);

  const salesChartData = {
    labels,
    datasets: [
      {
        label: "Ventes mensuelles",
        data: statistiquesVentes.ventesParMois,
        borderColor: "rgba(153, 102, 255, 0.5)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-4 py-6 shadow-sm w-full lg:w-1/2">
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-start sm:max-w-40">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Total des ventes</h1>
              <p className="text-sm font-semibold mb-4 text-grayDark">
                Jan 1, {selectedYear} - Dec 31, {selectedYear}
              </p>
            </div>
            <div className="">
              <p className="text-3xl font-bold">{statistiquesVentes.totalDesVentes} DT</p>
              {statistiquesVentes.evolutionPourcentage !== 0 && (
                statistiquesVentes.evolutionPourcentage < 0 ? (
                  <div className="flex items-center gap-1 mt-2">
                    <div className="bg-bgRed dark:bg-bgRedDark p-1 rounded-full">
                      <ArrowBigDown className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-sm font-semibold text-red-600">
                      {statistiquesVentes.evolutionPourcentage}%
                    </span>
                    <span className="text-xs">Il y&apos;a un an</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 mt-2">
                    <div className="bg-bgGreen dark:bg-bgGreenDark p-1 rounded-full">
                      <ArrowBigUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {statistiquesVentes.evolutionPourcentage}%
                    </span>
                    <span className="text-xs">Il y&apos;a un an</span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex-1">
            <AreaChart chartData={salesChartData} />
          </div>
        </div>
      </div>

      <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full lg:w-1/2">
        <div className="mb-4">
            <h1 className="text-xl font-semibold">Statistiques des ventes</h1>
            <p className="text-sm font-semibold mb-2 text-grayDark">
              Jan 1, {selectedYear} - Dec 31, {selectedYear}
            </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start">
            <p className="text-xl sm:text-2xl font-bold">{statistiquesVentes.totalDesVentes} DT</p>
            <p className="text-sm text-grayDark">Total des ventes</p>
            <div className="w-full bg-gray-200 dark:bg-borderGrayDark rounded-full h-2 mt-2">
              <div className="h-2 rounded-full" style={{ width: `${pourcentageVentes}%`, backgroundColor: "rgba(54, 162, 235, 0.5)" }}></div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <p className="text-xl sm:text-2xl font-bold">{statistiquesVentes.nombreCommandes}</p>
            <p className="text-sm text-grayDark">Nb Commandes</p>
            <div className="w-full bg-gray-200 dark:bg-borderGrayDark rounded-full h-2 mt-2">
              <div className="h-2 rounded-full" style={{ width: `${pourcentageCommandes}%`, backgroundColor: "rgba(75, 192, 192, 0.5)" }}></div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <p className="text-xl sm:text-2xl font-bold">{statistiquesVentes.revenuParCommande} DT</p>
            <p className="text-sm text-grayDark">R. par Commande</p>
            <div className="w-full bg-gray-200 dark:bg-borderGrayDark rounded-full h-2 mt-2">
              <div className="h-2 rounded-full" style={{ width: `${pourcentageRevenu}%`, backgroundColor: "rgba(255, 99, 132, 0.5)" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;