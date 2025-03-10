import { Home } from "lucide-react";
import Header from "@/pages/Admin/Content/Header";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import SalesStatistics from "@/components/Statistics/SalesStatistics";

const Dashboard = () => {
  return (
    <>
      <Header title="Tableau de bord" icon={Home} parent="Tableau de bord" />
      <section className="mx-6 py-6 space-y-7">
        <SalesStatistics />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Commandes récentes (colspan 2 pour les petites tailles d'écran) */}
          <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full sm:col-span-2">
              <div className="flex items-center justify-center h-100">
                <div className="flex flex-col max-w-lg">
                  Commandes récentes
                </div>
              </div>
          </div>

          {/* Statistiques genres - premier élément */}
          <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
              <div className="flex items-center justify-center h-100">
                <div className="flex flex-col">
                    Statistiques genres
                    <DoughnutChart />
                </div>
              </div>
          </div>

          {/* Statistiques genres - deuxième élément */}
          <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
              <div className="flex items-center justify-center h-100">
                <div className="flex flex-col">
                    Statistiques genres
                    <DoughnutChart />
                </div>
              </div>
          </div>

          {/* Statistiques genres - troisième élément */}
          <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
              <div className="flex items-center justify-center h-100">
                <div className="flex flex-col">
                    Statistiques genres
                    <DoughnutChart />
                </div>
              </div>
          </div>

          {/* Statistiques genres - quatrième élément */}
          <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
              <div className="flex items-center justify-center h-100">
                <div className="flex flex-col">
                    Statistiques genres
                    <DoughnutChart />
                </div>
              </div>
          </div>
        </div>

        
      </section>
    </>
  );
};

export default Dashboard;
  