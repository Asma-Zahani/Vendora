import Header from "@/components/Header/DashboardSubHeader";
import { Users } from "lucide-react";
import EntityManager from "@/service/EntityManager";

export const Clients = () => {
  const columns = [
    { label: "Client", type: "nomComplete" },
    { label: "Téléphone", key: "telephone", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Actions", key: "actions", type: "actions" }
  ];

  return (
    <>
      <Header title="Liste des clients" icon={Users} parent="Clients" current="Liste des clients" />
      <EntityManager notAdd={true} columns={columns} label="driveClients" identifiant="id" actionList={["view"]}/>
    </>
  );
};