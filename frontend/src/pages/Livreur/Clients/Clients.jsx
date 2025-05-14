import Header from "@/components/Header/DashboardSubHeader";
import { Users } from "lucide-react";

export const Clients = () => {

  return (
    <>
      <Header title="Liste des clients" icon={Users} parent="Clients" current="Liste des clients" />
    </>
  );
};