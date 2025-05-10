import { Truck, RefreshCcw, CreditCard, MessageCircle } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Truck size={30} />,
      title: "Livraison rapide",
      description: "Partout en Tunisie, du lundi au samedi",
    },
    {
      icon: <RefreshCcw size={30} />,
      title: "Retrait en magasin",
      description: "Commandez en ligne, récupérez sur place",
    },
    {
      icon: <CreditCard size={30} />,
      title: "Paiement sécurisé",
      description: "Carte bancaire ou paiement à la livraison",
    },
    {
      icon: <MessageCircle size={30} />,
      title: "Service client",
      description: "Disponible 7j/7 pour répondre à vos questions",
    },
  ];  

  return (
    <section className="container px-6 py-16 mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index}>
            <div className="text-purpleLight">{feature.icon}</div>

            <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h1>

            <p className="mt-2 text-gray-500 dark:text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
 
};

export default Features;
