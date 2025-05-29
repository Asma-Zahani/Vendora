import { Home, PackageCheck, Users, Package, ScanBarcode, PackageOpen, PackageX } from "lucide-react";

const menuResponsable = [
  {
    title: "Général",
    items: [
      { label: "Tableau de bord", icon: <Home size={20} />, path: "/dashboardResponsable" },
    ],
  },
  {
    title: "Gestion des colis",
    items: [
      { label: "Colis à traiter", icon: <PackageOpen size={20} />, path: "/colisATraiter" },
      { label: "Colis prêts", icon: <Package size={20} />, path: "/colisPrets" },
    ],
  },
  {
    title: "Scan",
    items: [
      { label: "Scanner un colis", icon: <ScanBarcode size={20} />, path: "/scanColis" },
    ],
  },
  {
    title: "Clients",
    items: [
      { label: "Liste des clients", icon: <Users size={20} />, path: "/clientsDrive" },
    ],
  },
  {
    title: "Historique",
    items: [
      { label: "Colis retirés", icon: <PackageCheck size={20} />, path: "/colisRecuperes" },
      { label: "Colis annulés", icon: <PackageX size={20} />, path: "/colisAnnulesDrive" },
    ],
  }
];

export default menuResponsable;