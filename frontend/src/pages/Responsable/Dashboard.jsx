import { Home } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";

export const Dashboard = () => {
  return (
    <>
      <Header title="Tableau de bord" icon={Home} parent="Tableau de bord" />
    </>
  );
};

export default Dashboard;
