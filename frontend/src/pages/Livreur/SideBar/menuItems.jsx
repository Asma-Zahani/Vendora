import { Home, Package, Clock, User, MapPin } from "lucide-react";

const menuItems = [
  {
    title: "Général",
    items: [
      { label: "Tableau de bord", icon: <Home size={20} />, path: "/livreur/dashboard" },
    ],
  },
  {
    title: "Commandes",
    items: [
      { label: "À livrer", icon: <Package size={20} />, path: "/livreur/commandes/en-cours" },
      { label: "Historique", icon: <Clock size={20} />, path: "/livreur/commandes/historique" },
    ],
  },
  {
    title: "Clients",
    items: [
      { label: "Détails clients", icon: <User size={20} />, path: "/livreur/clients" },
      { label: "Adresse de livraison", icon: <MapPin size={20} />, path: "/livreur/adresses" },
    ],
  },
];

export default menuItems;