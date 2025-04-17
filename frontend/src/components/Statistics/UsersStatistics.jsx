import DoughnutChart from "@/components/Charts/DoughnutChart";
import PieChart from "@/components/Charts/PieChart";
import { getAuthenticatedEntities } from "@/service/EntitesService";
import { useEffect, useState } from "react";

const UsersStatistics = () => {
  const [genreCount, setGenreCount] = useState([]);
  const [ageCount, setAgeCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGenreCount(await getAuthenticatedEntities("genreCount"));
        setAgeCount(await getAuthenticatedEntities("ageCount"));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  console.log(genreCount);
  
  const dataGenre = {
    labels: ['Male', 'Femelle'],
    datasets: [
      {
        label: 'Répartition par genre',
        data: [genreCount.Male, genreCount.Femelle],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const dataAge = {
    labels: ['Enfant', 'Jeune', 'Adulte'],
    datasets: [
      {
        label: 'Répartition par âge',
        data: [ageCount.Enfant, ageCount.Jeune, ageCount.Adulte],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataEmploi = {
    labels: ["Employé", "Sans emploi", "Retraité", "Indépendant"],
    datasets: [
      {
        label: 'Répartition par emploi',
        data: [25, 50, 15, 8], // Exemple : 50% salariés, etc.
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataConnexion = {
    labels: ['Smartphone', 'Tablette', 'Pc'],
    datasets: [
      {
        label: 'Modes de connexion',
        data: [50, 35, 20], // Exemple : 60% via email, etc.
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Bloc commandes récentes */}
      <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full sm:col-span-2">
        <div className="flex items-center justify-center h-100">
          <div className="flex flex-col max-w-lg">Users</div>
        </div>
      </div>

      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Répartition par genre</h1>
        <div className="flex items-center justify-center">
          <DoughnutChart data={dataGenre} />
        </div>
      </div>

      {/* Statistiques âges */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Répartition par âge</h1>
        <div className="flex items-center justify-center">
          <DoughnutChart data={dataAge} />
        </div>
      </div>

      {/* Statistiques emploi */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Répartition par emploi</h1>
        <div className="flex items-center justify-center">
          <DoughnutChart data={dataEmploi} />
        </div>
      </div>

      {/* Statistiques connexion */}
      <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Modes de connexion</h1>
        <div className="flex items-center justify-center">
          <PieChart data={dataConnexion} />
        </div>
      </div>
    </div>
  );
};

export default UsersStatistics;