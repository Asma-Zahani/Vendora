import { useContext } from "react";
import UserContext from '@/utils/UserContext';
import Hero from "./Hero";
import Features from "./Features";
import RecentsProduits from "./RecentsProduits";
import PreferencesModal from "@/components/Modals/PreferencesModal";
// import ProductRecommendations from './ProductRecommendations';

const Home = () => {
  const { user } = useContext(UserContext);
  const showPreferencesModal = user && !user.preferences;
  
  return (
    <div className="duration-200">
      {showPreferencesModal && <PreferencesModal />}
      <Hero />
      <Features />
      <RecentsProduits />
      {/* <ProductRecommendations /> */}
    </div>
  );
};

export default Home;