import PageNotFound from "@/pages/PageNotFound";
import AdminInterface from "@/pages/Admin/AdminInterface";
import LivreurInterface from "@/pages/Livreur/LivreurInterface";
import UserInterface from "@/pages/Client/UserInterface";
import Login from "@/pages/Authentification/Login";
import Register from "@/pages/Authentification/Register";
import ForgetPassword from "@/pages/Authentification/ForgetPassword";
import ResetPassword from "@/pages/Authentification/ResetPassword";
import Shop from "@/pages/Client/Content/Boutique/Boutique";
import { Dashboard as AdminDashboard }  from "@/pages/Admin/Content/Dashboard/Dashboard";
import { Dashboard as LivreurDashboard }  from "@/pages/Livreur/Content/Dashboard/Dashboard";
import Produits from "@/pages/Admin/Content/Gestion des produits/Produits";
import Categories from "@/pages/Admin/Content/Gestion des produits/Categories";
import SousCategories from "@/pages/Admin/Content/Gestion des produits/SousCategories";
import Marques from "../pages/Admin/Content/Gestion des produits/Marques";
import { ProtectedAdminRoutes, ProtectedLivreurRoutes, ProtectedClientRoutes, ProtectedAuthRoutes } from "@/utils/ProtectedRoutes";
import Clients from "../pages/Admin/Content/Gestion des utilisateurs/Clients";
import Livreurs from "../pages/Admin/Content/Gestion des utilisateurs/Livreurs";
import CommandeLivraison from "../pages/Admin/Content/Gestion des commandes/CommandeLivraison";
import CommandeRetraitDrive from "../pages/Admin/Content/Gestion des commandes/CommandeRetraitDrive";
import CodePromotions from "../pages/Admin/Content/Promotions et Offres/CodePromotions";
import Promotions from "../pages/Admin/Content/Promotions et Offres/Promotions";
import Drives from "../pages/Admin/Content/Paramètres/Drives";
import Horaires from "../pages/Admin/Content/Paramètres/Horaires";
import JoursFeries from "../pages/Admin/Content/Paramètres/joursFeries";
import Cart from "../pages/Client/Content/Protected/Cart";
import Wishlist from "../pages/Client/Content/Protected/Wishlist";
import Checkout from "../pages/Client/Content/Protected/Checkout";
import Account from "../pages/Client/Content/Protected/UserAccount/Account";
import UpdateProfile from "../pages/Client/Content/Protected/UserAccount/UpdateProfile";
import UpdatePassword from "../pages/Client/Content/Protected/UserAccount/UpdatePassword";
import OrderHistory from "../pages/Client/Content/Protected/UserAccount/OrderHistory";
import Offres from "../pages/Client/Content/Protected/UserAccount/Offres";
import DetailProduit from "../pages/Client/Content/Boutique/DetailProduit";
import Tracking from "../pages/Client/Content/Protected/UserAccount/Tracking";
import Laivraison from "../pages/Client/Content/Protected/Laivraison";
import Paiement from "../pages/Client/Content/Protected/Paiement";

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
      { path: "shop", element: <Shop /> },
      { path: "shop/:id", element: <DetailProduit /> },
      { path: "", element: <ProtectedClientRoutes />, 
        children: [
          { path: "cart", element: <Cart /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "checkout", element: <Checkout /> },
          { path: "laivraison", element: <Laivraison /> },
          {path:"paiement" , element: <Paiement /> },
          {
            path: "", 
            element: <Account />,
            children: [
              { path: "updateProfile", element: <UpdateProfile /> },
              { path: "updatePassword", element: <UpdatePassword /> },
              { path: "tracking", element: <Tracking /> },
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
        element: <LivreurInterface />,
        children: [
          { path: "dash", element: <LivreurDashboard /> },
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
        element: <AdminInterface />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "produits", element: <Produits /> },
          { path: "categories", element: <Categories /> },
          { path: "sousCategories", element: <SousCategories /> },
          { path: "marques", element: <Marques /> },
          { path: "clients", element: <Clients /> },
          { path: "livreurs", element: <Livreurs /> },
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