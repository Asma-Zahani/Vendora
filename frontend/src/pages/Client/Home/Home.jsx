import { useContext, useEffect, useState } from "react";
import UserContext from '@/utils/UserContext';
import Hero from "./Hero";
import Features from "./Features";
import ProduitsSection from "@/components/Produits/ProduitsSection";
import PreferencesModal from "@/components/Modals/PreferencesModal";
import { getEntities, getRecommandations } from "@/service/EntitesService";

const Home = () => {
const { user } = useContext(UserContext);
const [recentsProduits, setRecentsProduits] = useState([]);
const [produitsRecommandes, setProduitsRecommandes] = useState([]);
const showPreferencesModal = user && !user.preferences;

useEffect(() => {
  const fetchData = async () => {
    setRecentsProduits(await getEntities("recentProduits"));
    const data = await getRecommandations("recommend_produits",user?.id ? { user_id: user?.id }: {});
    setProduitsRecommandes(data?.data ? data.data : []);
    console.log(data);
  };
  fetchData();
}, [user]);

return (
  <div className="duration-200">
    {showPreferencesModal && <PreferencesModal />}
    <Hero />
    <Features />
    <ProduitsSection titre={"Produits récents"} sousTitre={"Nouveautés cette semaine"} produits={recentsProduits} />
    <ProduitsSection titre={"Produits recommandés"} sousTitre={"Notre sélection personnalisée"} produits={produitsRecommandes} />
  </div>
);
};

export default Home;