import { Home } from "lucide-react";
import Header from "@/pages/Admin/Content/Header";
import SalesStatistics from "@/components/Statistics/SalesStatistics";
import UsersStatistics from "@/components/Statistics/UsersStatistics";
import OrdersStatistics from "@/components/Statistics/OrdersStatistics";

const Dashboard = () => {
  return (
    <>
      <Header title="Tableau de bord" icon={Home} parent="Tableau de bord" />
      <section className="mx-6 py-6 space-y-7">
        <SalesStatistics />
        <OrdersStatistics />  
        <UsersStatistics />        
      </section>
    </>
  );
};

export default Dashboard;