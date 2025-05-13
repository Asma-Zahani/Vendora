import { Home, PackageCheck, Users, CalendarCheck, BarChart2, LogOut, Package, ScanBarcode } from "lucide-react";

const menuResponsable = [
  {
    title: "Général",
    items: [
      { label: "Tableau de bord", icon: <Home size={20} />, path: "DashboardResponsable" },
    ],
  },
  {
    title: "Gestion des colis",
    items: [
      { label: "Colis prêts", icon: <Package size={20} />, path: "colisPrets" },
      { label: "Colis récupérés", icon: <PackageCheck size={20} />, path: "colisRecuperes" },
    ],
  },
  {
    title: "Scan",
    items: [
      { label: "Scanner un colis", icon: <ScanBarcode size={20} />, path: "scanColis" },
    ],
  },
  {
    title: "Clients",
    items: [
      { label: "Liste des clients", icon: <Users size={20} />, path: "clients" },
    ],
  },
  {
    title: "Suivi & Statistiques",
    items: [
      { label: "Historique retraits", icon: <CalendarCheck size={20} />, path: "historique" },
      { label: "Statistiques", icon: <BarChart2 size={20} />, path: "statsDrive" },
    ],
  },
  {
    title: "Compte",
    items: [
      { label: "Déconnexion", icon: <LogOut size={20} />, path: "logout" },
    ],
  },
];

export default menuResponsable;