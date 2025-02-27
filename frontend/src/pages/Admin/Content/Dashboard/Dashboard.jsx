import { Home } from "lucide-react";
import Header from "@/pages/Admin/Content/Header";

const Dashboard = () => {
  return (
    <>
      <Header title="Tableau de bord" icon={Home} parent="Tableau de bord" />
      <div className="p-6 text-3xl">
        Hello
      </div>
    </>
  );
};

export default Dashboard;
