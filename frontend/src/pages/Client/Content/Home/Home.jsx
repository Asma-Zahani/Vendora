import { useContext, useEffect, useState } from "react";
import UserContext from '@/utils/UserContext';
import Hero from "./Hero";
import Features from "./Features";
import ProduitsSection from "./ProduitsSection";
import PreferencesModal from "@/components/Modals/PreferencesModal";
import { getEntities, createEntity } from "@/service/EntitesService";

const Home = () => {
  const { user } = useContext(UserContext);
  const [recentsProduits, setRecentsProduits] = useState([]);
  const [produits, setProduits] = useState([]);
  const showPreferencesModal = user && !user.preferences;

  useEffect(() => {
    const fetchData = async () => {
      setProduits(await createEntity("getRecommandations", user ? { user_id: user.id } : {}));
      setRecentsProduits(await getEntities("recentProduits"));
    }; 
    fetchData();
  }, [user]);

  console.log(produits);
  
  return (
    <div className="duration-200">
      {showPreferencesModal && <PreferencesModal />}
      <Hero />
      <Features />
      <ProduitsSection titre={"Produits récents"} sousTitre={"Nouveautés cette semaine"} produits={recentsProduits} />
      <ProduitsSection titre={"Produits recommandés"} sousTitre={"Produits basés sur vos préférences et interactions"} produits={produits} />
    </div>
  );
};

export default Home;