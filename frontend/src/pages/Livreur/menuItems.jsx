import { Home, Package, Clock, User, MapPin } from "lucide-react";

const menuLivreur = [
  {
    title: "Général",
    items: [
      { label: "Tableau de bord", icon: <Home size={20} />, path: "DashboardLivreur" },
    ],
  },
  {
    title: "Commandes",
    items: [
      { label: "À livrer", icon: <Package size={20} />, path: "/commandesEncours" },
      { label: "Historique", icon: <Clock size={20} />, path: "/commandesHistorique" },
    ],
  },
  {
    title: "Clients",
    items: [
      { label: "Détails clients", icon: <User size={20} />, path: "/clientsLivreur" },
      { label: "Adresse de livraison", icon: <MapPin size={20} />, path: "/adresses" },
    ],
  },
];

export default menuLivreur;