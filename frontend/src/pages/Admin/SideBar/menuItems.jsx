import { Home, Users, Truck, Tag, Percent, Bookmark, ShoppingBag, Clock, Package, Layers2Icon, Layers3Icon, CalendarDaysIcon } from "lucide-react";

const menuItems = [
  {
    title: "Tableau de bord",
    items: [
      { label: "Tableau de bord", icon: <Home size={20} />, path: "/dashboard" },
    ],
  },
  {
    title: "Gestion des produits",
    items: [
      { label: "Catégories", icon: <Layers2Icon size={20} />, path: "/categories" },
      { label: "SousCategories", icon: <Layers3Icon size={20} />, path: "/sousCategories" },
      { label: "Marques", icon: <Bookmark size={20} />, path: "/marques" },
      { label: "Produits", icon: <ShoppingBag size={20} />, path: "/produits" },
    ],
  },
  {
    title: "Gestion des utilisateurs",
    items: [
      { label: "Clients", icon: <Users size={20} />, path: "/clients" },
      { label: "Livreurs", icon: <Truck size={20} />, path: "/livreurs" }
    ],
  },
  {
    title: "Gestion des commandes",
    items: [
      /*{ label: "Historique des commandes", icon: <FileText size={20} />, path: "/commandes" },*/
      {
        label: "Commandes",
        icon: <Package size={20} />,
        subItems: [
          { label: "Livraison", path: "/commandesLivraison" },
          { label: "Retrait Drive", path: "/commandesRetraitDrive" },
        ],
      },
    ],
  },
  {
    title: "Promotions et Offres",
    items: [
      { label: "Codes Promotions", icon: <Tag size={20} />, path: "/codePromotions" },
      { label: "Promotions", icon: <Percent size={20} />, path: "/promotions" },
    ],
  },
  {
    title: "Paramètres",
    items: [
      { label: "Horaires", icon: <Clock size={20} />, path: "/horaires" },
      { label: "Jours fériés", icon: <CalendarDaysIcon size={20} />, path: "/joursFeries" }
    ],
  },
];

export default menuItems;
