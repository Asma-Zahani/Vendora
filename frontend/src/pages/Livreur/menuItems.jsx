import { Home, Package, MapPin, ScanBarcode, ClipboardCheck, BarChart2, Users } from "lucide-react";

const menuLivreur = [
  {
    title: "Général",
    items: [
      { label: "Tableau de bord", icon: <Home size={20} />, path: "/dashboardLivreur" },
    ],
  },
  {
    title: "Gestion des colis",
    items: [
      { label: "Colis à livrer", icon: <Package size={20} />, path: "/colisALivrer" },
      { label: "Carte de livraison", icon: <MapPin size={20} />, path: "/carteLivraison" },
    ],
  },
  {
    title: "Scan",
    items: [
      { label: "Scanner un colis", icon: <ScanBarcode size={20} />, path: "/scanColisLivree" },
      // { label: "Confirmer livraison", icon: <CheckCircle size={20} />, path: "/confirmationLivraison" },
    ],
  },
  {
    title: "Clients",
    items: [
      { label: "Liste des clients", icon: <Users size={20} />, path: "/clients" },
    ],
  },
  {
    title: "Suivi & Statistiques",
    items: [
      { label: "Historique livraison", icon: <ClipboardCheck size={20} />, path: "/colisLivrees" },
      { label: "Statistiques", icon: <BarChart2 size={20} />, path: "/statsLivreur" },
      // { label: "Commandes Annulées", icon: <History size={20} />, path: "/colisAnnulees" },
    ],
  },
];

export default menuLivreur;