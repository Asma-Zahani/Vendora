/* eslint-disable react/prop-types */
import DoughnutChart from "@/components/Charts/DoughnutChart";
// import PieChart from "@/components/Charts/PieChart";
import { Link } from 'react-router';

const UsersStatistics = ({genreCount, ageCount, users}) => {

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Bloc commandes récentes */}
      <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm w-full sm:col-span-2">
        <div className="h-100">
          <h1 className="text-xl font-semibold mb-4">Users</h1>
          <div className="max-h-[350px] overflow-y-auto scrollbar relative">
            {users?.length > 0 &&
              <table className="min-w-full">
                <thead className="sticky top-0 bg-customLight dark:bg-customDark z-10 border-b border-contentLight dark:border-borderDark shadow-xs dark:shadow-borderDark">
                  <tr>
                    <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">User</th>
                    <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Email</th>
                    <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-contentLight dark:border-borderDark">
                      <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200"><Link to={user.role === "client" ? "/clients" : user.role === "livreurs" ? "/livreurs" : ""}>{user.prenom + " " + user.nom}</Link></td>
                      <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200">{user.email}</td>
                      <td className="py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200">{user.telephone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
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
    </div>
  );
};

export default UsersStatistics;