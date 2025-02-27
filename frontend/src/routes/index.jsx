import PageNotFound from "@/pages/PageNotFound";
import AdminInterface from "@/pages/Admin/AdminInterface";
import UserInterface from "@/pages/Client/UserInterface";
import Login from "@/pages/Authentification/Login";
import Register from "@/pages/Authentification/Register";
import ForgetPassword from "@/pages/Authentification/ForgetPassword";
import ResetPassword from "@/pages/Authentification/ResetPassword";
import Home from "@/pages/Client/Content/Home";
import Shop from "@/pages/Client/Content/Boutique";
import Dashboard from "@/pages/Admin/Content/Dashboard/Dashboard";
import Produits from "@/pages/Admin/Content/Gestion des produits/Produits";
import Categories from "@/pages/Admin/Content/Gestion des produits/Categories";
import SousCategories from "@/pages/Admin/Content/Gestion des produits/SousCategories";
import Marques from "../pages/Admin/Content/Gestion des produits/Marques";
import { ProtectedAdminRoutes, ProtectedClientRoutes, ProtectedAuthRoutes } from "@/utils/ProtectedRoutes";
import Clients from "../pages/Admin/Content/Gestion des utilisateurs/Clients";
import Fournisseurs from "../pages/Admin/Content/Gestion des utilisateurs/Fournisseurs";
import Livreurs from "../pages/Admin/Content/Gestion des utilisateurs/Livreurs";
import CommandeLivraison from "../pages/Admin/Content/Gestion des commandes/CommandeLivraison";
import CommandeRetraitDrive from "../pages/Admin/Content/Gestion des commandes/CommandeRetraitDrive";
import FactureFournisseurs from "../pages/Admin/Content/Gestion des factures/FactureFournisseurs";
import FactureCommandes from "../pages/Admin/Content/Gestion des factures/FactureCommandes";
import CodePromotions from "../pages/Admin/Content/Promotions et Offres/CodePromotions";
import Promotions from "../pages/Admin/Content/Promotions et Offres/Promotions";
import Horaires from "../pages/Admin/Content/Paramètres/Horaires";
import JoursFeries from "../pages/Admin/Content/Paramètres/joursFeries";


const routes = [
  {
    path: "",
    element: <ProtectedAuthRoutes />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> }
    ]
  },
  {
    path: "/",
    element: <UserInterface />,
    children: [
      { path: "", element: <Home /> },
      //{ path: "shop", element: <Shop /> },
      { path: "shop", element: <Shop /> },
      { path: "", element: <ProtectedClientRoutes />, 
        children: [
          { path: "cart", element: <Home /> },
        ] 
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  },
  {
    path: "",
    element: <ProtectedAdminRoutes />,
    children: [
      {
        path: "",
        element: <AdminInterface />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "produits", element: <Produits /> },
          { path: "categories", element: <Categories /> },
          { path: "sousCategories", element: <SousCategories /> },
          { path: "marques", element: <Marques /> },
          { path: "clients", element: <Clients /> },
          { path: "fournisseurs", element: <Fournisseurs /> },
          { path: "livreurs", element: <Livreurs /> },
          { path: "commandesLivraison", element: <CommandeLivraison /> },
          { path: "commandesRetraitDrive", element: <CommandeRetraitDrive /> },
          { path: "facturesFournisseurs", element: <FactureFournisseurs /> },
          { path: "facturesCommandes", element: <FactureCommandes /> },
          { path: "promotions", element: <Promotions /> },
          { path: "codePromotions", element: <CodePromotions /> },
          { path: "horaires", element: <Horaires /> },
          { path: "joursFeries", element: <JoursFeries /> }
        ]
      }
    ]
  }
];

export default routes;
