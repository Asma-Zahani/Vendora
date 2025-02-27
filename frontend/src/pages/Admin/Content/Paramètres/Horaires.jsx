import Header from "../Header";
import { Clock } from "lucide-react";

const Horaires = () => {
  return (
    <>
      <Header title="Horaires" icon={Clock} parent="Paramètres" current="Horaires" />
    </>
  );
};

export default Horaires;
