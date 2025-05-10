import { useContext, useEffect, useState } from "react";
import UserContext from '@/utils/UserContext';
import Hero from "./Hero";
import Features from "./Features";
import ProduitsSection from "@/components/Produits/ProduitsSection";
import PreferencesModal from "@/components/Modals/PreferencesModal";
import { getEntities, getRecommandations } from "@/service/EntitesService";
import ChatbotModal from "@/components/Modals/ChatbotModal";

const Home = () => {
const { user } = useContext(UserContext);
const [recentsProduits, setRecentsProduits] = useState([]);
const [produits, setProduits] = useState([]);
const [isChatbotOpen, setIsChatbotOpen] = useState(false);

const showPreferencesModal = user && !user.preferences;

useEffect(() => {
  const fetchData = async () => {
  setRecentsProduits(await getEntities("recentProduits"));
  const data = await getRecommandations(user?.id);
  setProduits(data?.data ? data.data : []);
  };
  fetchData();
}, [user]);

return (
  <div className="duration-200">
    {showPreferencesModal && <PreferencesModal />}
    <Hero />
    <Features />
    <ProduitsSection titre={"Produits récents"} sousTitre={"Nouveautés cette semaine"} produits={recentsProduits} />
    <ProduitsSection titre={"Produits recommandés"} sousTitre={"Notre sélection personnalisée"} produits={produits} />
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-4 right-4 bg-purpleLight text-white px-4 py-2 rounded-full shadow-lg hover:bg-purpleLightHover z-40"
      >
        💬 Assistant
      </button>

      {isChatbotOpen && <ChatbotModal onClose={() => setIsChatbotOpen(false)} />}
  </div>
);
};

export default Home;