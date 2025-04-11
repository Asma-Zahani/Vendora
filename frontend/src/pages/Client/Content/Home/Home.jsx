import Hero from "./Hero";
import Features from "./Features";
import RecentsProduits from "./RecentsProduits";
// import ProductRecommendations from './ProductRecommendations';

const Home = () => {

  return (
    <div className="duration-200">
      <Hero />
      <Features />
      <RecentsProduits />
      {/* <ProductRecommendations /> */}
    </div>
  );
};

export default Home;