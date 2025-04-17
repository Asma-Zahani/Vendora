import { Home, Package, Clock, User, MapPin } from "lucide-react";

const menuItems = [
  {
    title: "Général",
    items: [
      { label: "Tableau de bord", icon: <Home size={20} />, path: "LivreurDashboard" },
    ],
  },
  {
    title: "Commandes",
    items: [
      { label: "À livrer", icon: <Package size={20} />, path: "/commandes/en-cours" },
      { label: "Historique", icon: <Clock size={20} />, path: "/commandes/historique" },
    ],
  },
  {
    title: "Clients",
    items: [
      { label: "Détails clients", icon: <User size={20} />, path: "/clients" },
      { label: "Adresse de livraison", icon: <MapPin size={20} />, path: "/adresses" },
    ],
  },
];

export default menuItems;