/* eslint-disable react/prop-types */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-customLight dark:bg-customDark p-4 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
      <h3 className="text-2xl font-bold">{value ?? 0}</h3>
    </div>
    <div className="text-purpleLight">{icon}</div>
  </div>
);

export default StatCard;