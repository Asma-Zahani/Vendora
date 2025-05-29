import { Home, Package, ScanBarcode, Users, Truck, PackageX, PackageCheck } from "lucide-react";

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
      { label: "Colis en cours", icon: <Truck size={20} />, path: "/colisEnCours" },
      // { label: "Carte de livraison", icon: <MapPin size={20} />, path: "/carteLivraison" },
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
      { label: "Liste des clients", icon: <Users size={20} />, path: "/clientsLivreur" },
    ],
  },
  {
    title: "Historique",
    items: [
      { label: "Colis livrés", icon: <PackageCheck size={20} />, path: "/colisLivrees" },
      { label: "Colis annulés", icon: <PackageX size={20} />, path: "/ColisAnnulesLivraison" },
    ],
  }
];

export default menuLivreur;