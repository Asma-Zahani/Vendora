import { Truck, RefreshCcw, CreditCard, MessageCircle } from 'lucide-react';

const Features = () => {
    const features = [
        {
          icon: <Truck size={30} />,
          title: "Livraison à domicile",
          description: "Lundi - vendredi | 9h-17h30",
        },
        {
          icon: <RefreshCcw size={30} />,
          title: "Retrait drive",
          description: "Lundi-vendredi 8h-21h | Samedi 8h-15",
        },
        {
          icon: <CreditCard size={30} />,
          title: "Paiement sécurisé",
          description: "Paiement 100% sécurisé",
        },
        {
          icon: <MessageCircle size={30} />,
          title: "24/7 Support",
          description: "Assistance 24/7 support dédié",
        },
      ];

      return (
        <div className="py-12">
          <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center text-center space-y-3 md:space-y-0 md:space-x-4 lg:border-r-2 dark:border-borderDark last:border-none">
                <div className="flex justify-center items-center text-3xl mb-4 md:mb-0 text-purpleLight">
                  {feature.icon}
                </div>
                <div className="flex flex-col text-left px-4">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-500 text-sm max-w-[200px]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
      
};

export default Features;
