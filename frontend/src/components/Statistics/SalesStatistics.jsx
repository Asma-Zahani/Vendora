import { useState } from "react";
import Dropdown from "@/components/Forms/Dropdown";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import AreaChart from "@/components/Charts/AreaChart";

const SalesStatistics = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setIsOpen(false);
  };

  const salesDataByYear = {
    "2024": {
      totalSales: "$654.85K",
      totalOrders: "1,250",
      avgRevenuePerOrder: "$523",
      monthlySales: [100, 500, 700, 600, 900, 750, 400, 800, 1100, 900, 950, 1050],
    },
    "2022": {
      totalSales: "$600.00K",
      totalOrders: "1,100",
      avgRevenuePerOrder: "$545",
      monthlySales: [150, 400, 600, 650, 800, 700, 450, 750, 1050, 850, 900, 1020],
    },
    "2023": {
      totalSales: "$550.00K",
      totalOrders: "1,050",
      avgRevenuePerOrder: "$500",
      monthlySales: [200, 450, 650, 550, 850, 650, 500, 700, 1000, 800, 870, 990],
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const data = salesDataByYear[selectedYear];

  const previousSales = salesDataByYear[String(Number(selectedYear) - 1)]?.totalSales || "$0";
  const salesDifference = previousSales.replace(/[^\d.]/g, "") ? 
    ((data.totalSales.replace(/[^\d.]/g, "") - previousSales.replace(/[^\d.]/g, "")) / previousSales.replace(/[^\d.]/g, "")) * 100 : 0;

  const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

  const salesChartData = {
    labels,
    datasets: [
      {
        label: "Ventes mensuelles",
        data: data.monthlySales,
        borderColor: "rgba(153, 102, 255, 0.5)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Carte Total des ventes */}
      <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-4 py-6 shadow-sm w-full lg:w-1/2">
        <div className="flex flex-row">
            <div className="flex flex-col items-start max-w-40">
            <h1 className="text-xl font-semibold">Total des ventes</h1>
            <p className="text-sm font-semibold mb-4 text-grayDark">
              Jan 1, {selectedYear} - Dec 31, {selectedYear}
            </p>
            <p className="text-3xl font-bold">{data.totalSales}</p>
            {salesDifference < 0 ? (
              <div className="flex items-center gap-1 mt-2">
                <div className="bg-bgRed dark:bg-bgRedDark p-1 rounded-full">
                  <ArrowBigDown className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm font-semibold text-red-600">{Math.abs(salesDifference).toFixed(2)}%</span>
                <span className="text-xs">Il y&apos;a un an</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-2">
                <div className="bg-bgGreen dark:bg-bgGreenDark p-1 rounded-full">
                  <ArrowBigUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-green-600">{salesDifference.toFixed(2)}%</span>
                <span className="text-xs">Il y&apos;a un an</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <AreaChart chartData={salesChartData} />
          </div>
        </div>
      </div>

      {/* Carte Statistiques des ventes */}
      <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full lg:w-1/2">
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Statistiques des ventes</h1>
            <p className="text-sm font-semibold mb-2 text-grayDark">
              Jan 1, {selectedYear} - Dec 31, {selectedYear}
            </p>
          </div>
          <div className="w-20 -mt-2">
            <Dropdown
              options={["2024", "2023", "2022"]}
              selectedValue={selectedYear}
              onSelect={handleYearChange}
              isOpen={isOpen}
              toggleOpen={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>

        {/* Grille des statistiques */}
        <div className="grid grid-cols-3 gap-4">
          {/* Total des ventes */}
          <div className="flex flex-col items-start">
            <p className="text-3xl font-bold">{data.totalSales}</p>
            <p className="text-sm text-grayDark">Total des ventes</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div className="h-2 rounded-full" style={{ width: "80%", backgroundColor: "rgba(54, 162, 235, 0.5)" }}></div>
            </div>
          </div>

          {/* Nombre total de commandes */}
          <div className="flex flex-col items-start">
            <p className="text-3xl font-bold">{data.totalOrders}</p>
            <p className="text-sm text-grayDark">Nombre de commandes</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div className="h-2 rounded-full" style={{ width: "70%", backgroundColor: "rgba(75, 192, 192, 0.5)" }}></div>
            </div>
          </div>

          {/* Revenu moyen par commande */}
          <div className="flex flex-col items-start">
            <p className="text-3xl font-bold">{data.avgRevenuePerOrder}</p>
            <p className="text-sm text-grayDark">Revenu par commande</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div className="h-2 rounded-full" style={{ width: "90%", backgroundColor: "rgba(255, 99, 132, 0.5)" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;