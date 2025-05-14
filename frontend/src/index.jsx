import PageNotFound from "@/pages/PageNotFound";
import menuAdmin from "@/pages/Admin/menuItems";
import menuLivreur from "@/pages/Livreur/menuItems";
import menuResponsable from "@/pages/Responsable/menuItems";
import UserInterface from "@/pages/UserInterface";
import DashboardInterface from "@/pages/DashboardInterface";
import Login from "@/pages/Authentification/Login";
import Register from "@/pages/Authentification/Register";
import ForgetPassword from "@/pages/Authentification/ForgetPassword";
import ResetPassword from "@/pages/Authentification/ResetPassword";
import Shop from "@/pages/Client/Boutique/Boutique";
import { Dashboard as AdminDashboard }  from "@/pages/Admin/Dashboard";
import { Dashboard as LivreurDashboard }  from "@/pages/Livreur/Dashboard";
import { Dashboard as ResponsableDashboard }  from "@/pages/Responsable/Dashboard";
import Produits from "@/pages/Admin/Gestion des produits/Produits";
import Categories from "@/pages/Admin/Gestion des produits/Categories";
import SousCategories from "@/pages/Admin/Gestion des produits/SousCategories";
import Marques from "@/pages/Admin/Gestion des produits/Marques";
import { ProtectedAdminRoutes, ProtectedLivreurRoutes, ProtectedResponsableRoutes, ProtectedClientRoutes, ProtectedAuthRoutes } from "@/utils/ProtectedRoutes";
import Clients from "@/pages/Admin/Gestion des utilisateurs/Clients";
import { Clients as DriveClients } from "@/pages/Responsable/Clients/Clients";
import { Clients as LivreurClients } from "@/pages/Livreur/Clients/Clients";
import Livreurs from "@/pages/Admin/Gestion des utilisateurs/Livreurs";
import Responsables from "@/pages/Admin/Gestion des utilisateurs/Responsables";
import CommandeLivraison from "@/pages/Admin/Gestion des commandes/CommandeLivraison";
import CommandeRetraitDrive from "@/pages/Admin/Gestion des commandes/CommandeRetraitDrive";
import CodePromotions from "@/pages/Admin/Promotions et Offres/CodePromotions";
import Promotions from "@/pages/Admin/Promotions et Offres/Promotions";
import Drives from "@/pages/Admin/Parametres/Drives";
import Horaires from "@/pages/Admin/Parametres/Horaires";
import JoursFeries from "@/pages/Admin/Parametres/JoursFeries";
import Cart from "@/pages/Client/Protected/Cart";
import Wishlist from "@/pages/Client/Protected/Wishlist";
import Checkout from "@/pages/Client/Protected/Checkout";
import Account from "@/pages/Client/Protected/UserAccount/Account";
import UpdateProfile from "@/pages/Client/Protected/UserAccount/UpdateProfile";
import UpdatePassword from "@/pages/Client/Protected/UserAccount/UpdatePassword";
import OrderHistory from "@/pages/Client/Protected/UserAccount/OrderHistory";
import Offres from "@/pages/Client/Protected/UserAccount/Offres";
import DetailProduit from "@/pages/Client/Boutique/DetailProduit";
import AdressesLivraison from "@/pages/Livreur/Gestion des colis/AdressesLivraison";
import Mentions from "@/pages/Legal/Mentions";
import Confidentialite from "@/pages/Legal/Confidentialite";
import CGV from "@/pages/Legal/CGV";
import CGU from "@/pages/Legal/CGU";
import Protection from "@/pages/Legal/Protection";
import Contact from "@/pages/Client/Contact";
import About from "@/pages/Client/About";
import ColisPrets from "./pages/Responsable/Gestion des colis/ColisPrets";
import ColisRecuperes from "./pages/Responsable/Suivi & Statistiques/ColisRecuperes";
import StatsDrive from "./pages/Responsable/Suivi & Statistiques/StatsDrive";
import ScanColis from "./pages/Responsable/Scan/ScanColis";
import ColisATraiter from "./pages/Responsable/Gestion des colis/ColisATraiter";
import ColisLivrees from "./pages/Livreur/Suivi & Statistiques/ColisLivrees";
import StatsLivreur from "./pages/Livreur/Suivi & Statistiques/StatsLivreur";
import ColisALivrer from "./pages/Livreur/Gestion des colis/ColisALivrer";
import ScanColisLivree from "./pages/Livreur/Scan/ScanColisLivree";

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
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "mentions", element: <Mentions /> },
      { path: "confidentialite", element: <Confidentialite /> },
      { path: "cgv", element: <CGV /> },
      { path: "cgu", element: <CGU /> },
      { path: "protection", element: <Protection /> },
      { path: "boutique", element: <Shop /> },
      { path: "boutique/:id", element: <DetailProduit /> },
      { path: "", element: <ProtectedClientRoutes />, 
        children: [
          { path: "cart", element: <Cart /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "checkout", element: <Checkout /> },
          {
            path: "", 
            element: <Account />,
            children: [
              { path: "updateProfile", element: <UpdateProfile /> },
              { path: "updatePassword", element: <UpdatePassword /> },
              { path: "orderHistory", element: <OrderHistory /> },
              { path: "offres", element: <Offres /> },
            ]
          }
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
    element: <ProtectedLivreurRoutes />,
    children: [
      {
        path: "",
        element: <DashboardInterface menuItems={menuLivreur} />,
        children: [
          { path: "dashboardLivreur", element: <LivreurDashboard /> },
          { path: "colisALivrer", element: <ColisALivrer />},
          { path: "colisLivrees", element: <ColisLivrees />},
          { path: "scanColisLivree", element: <ScanColisLivree />},
          { path: "carteLivraison", element: <AdressesLivraison /> },
          { path: "statsLivreur", element: <StatsLivreur />},
          { path: "clientsLivreur", element: <LivreurClients />}
        ]
      }
    ]
  },
  {
    path: "",
    element: <ProtectedResponsableRoutes />,
    children: [
      {
        path: "",
        element: <DashboardInterface menuItems={menuResponsable} />,
        children: [
          { path: "dashboardResponsable", element: <ResponsableDashboard /> },
          { path: "colisATraiter", element: <ColisATraiter /> },
          { path: "colisPrets", element: <ColisPrets /> },
          { path: "colisRecuperes", element: <ColisRecuperes /> },
          { path: "scanColis", element: <ScanColis />},
          { path: "statsDrive", element: <StatsDrive />},
          { path: "clientsDrive", element: <DriveClients />}
        ]
      }
    ]
  },
  {
    path: "",
    element: <ProtectedAdminRoutes />,
    children: [
      {
        path: "",
        element: <DashboardInterface menuItems={menuAdmin} />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "produits", element: <Produits /> },
          { path: "categories", element: <Categories /> },
          { path: "sousCategories", element: <SousCategories /> },
          { path: "marques", element: <Marques /> },
          { path: "clients", element: <Clients /> },
          { path: "livreurs", element: <Livreurs /> },
          { path: "responsables", element: <Responsables />},
          { path: "commandesLivraison", element: <CommandeLivraison /> },
          { path: "commandesRetraitDrive", element: <CommandeRetraitDrive /> },
          { path: "promotions", element: <Promotions /> },
          { path: "codePromotions", element: <CodePromotions /> },
          { path: "drives", element: <Drives /> },
          { path: "horaires", element: <Horaires /> },
          { path: "joursFeries", element: <JoursFeries /> }
        ]
      }
    ]
  }
];

export default routes;