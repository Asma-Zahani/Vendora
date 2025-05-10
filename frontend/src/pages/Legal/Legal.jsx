/* eslint-disable react/prop-types */
const Legal = ({titre, data}) => {
  return (
    <div className="my-8 p-4 max-w-5xl mx-auto text-sm text-gray-800 dark:text-gray-400">
      <h1 className="flex justify-center text-3xl font-bold mb-4 text-purpleLight">{titre}</h1>
      {data.map((item, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-semibold my-4 text-purpleLight text-xl">{item.titre}</h2>
          <div className="space-y-2">{item.contenu}</div>
        </div>
      ))}
    </div>
  );
};

export default Legal;