import { Home } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";
import SalesStatistics from "@/components/Statistics/SalesStatistics";
import UsersStatistics from "@/components/Statistics/UsersStatistics";
import OrdersStatistics from "@/components/Statistics/OrdersStatistics";
import { useEffect, useState } from "react";
import { getEntities } from "@/service/EntitesService";
import Input from "@/components/ui/Input";

export const Dashboard = () => {
  const [genreCount, setGenreCount] = useState([]);
  const [ageCount, setAgeCount] = useState([]);
  const [listAnnee, setListAnnee] = useState([]);
  const [statistiquesVentes, setStatistiquesVentes] = useState([]);
  const [statistiquesCommandes, setStatistiquesCommandes] = useState([]);
  const [commandesEnAttente, setCommandesEnAttente] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [isOpen, setIsOpen] = useState(false);
  const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setGenreCount(await getEntities("genreCount"));
        setAgeCount(await getEntities("ageCount"));
        setListAnnee(await getEntities("listAnnee"));
        setCommandesEnAttente(await getEntities("commandesEnAttente"));
        setUsers(await getEntities("users"));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatistiquesVentes(await getEntities(`statistiquesVentes/${selectedYear}`));
        setStatistiquesCommandes(await getEntities(`statistiquesCommandes/${selectedYear}`));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, [selectedYear]);

  return (
    <>
      <Header title="Tableau de bord" icon={Home} parent="Tableau de bord" />
      <section className="mx-6 py-6 space-y-7">
        <div className="grid grid-cols-1">
          <div className="bg-customLight dark:bg-customDark rounded-lg px-6 shadow-sm w-full">
            <div className="flex justify-between items-center">
              <p className="">
                Sélectionnez l&apos;année pour afficher les statistiques :
              </p>
              <div className="relative w-40 my-4 mt-3">
                <Input value={selectedYear} onClick={() => setIsOpen(!isOpen)} required readOnly/>
                {isOpen && (
                  <div className="absolute mt-1 z-10 w-full bg-customLight dark:bg-contentDark border border-gray-300 dark:border-purpleLight rounded-md shadow-lg max-h-50 overflow-x-auto scrollbar">
                    {listAnnee.map((option, index) => (
                      <div key={index} className={`px-4 py-2 text-gray-700 hover:bg-purpleLight hover:text-white dark:hover:text-white cursor-pointer 
                        ${ selectedYear === option ? "bg-purpleLight text-white" : "dark:text-grayDark" }`}
                        onClick={() => {setSelectedYear(option); setIsOpen(false);}} > {option} </div> ))}
                  </div>)}
              </div>
            </div>
          </div>
        </div>
          
        <SalesStatistics labels={labels} selectedYear={selectedYear} statistiquesVentes={statistiquesVentes} />
        <OrdersStatistics labels={labels} statistiquesCommandes={{...statistiquesCommandes, commandesEnAttente}} />  
        <UsersStatistics genreCount={genreCount} ageCount={ageCount} users={users} />        
      </section>
    </>
  );
};