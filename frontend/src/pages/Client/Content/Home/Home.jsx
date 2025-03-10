import Hero from "./Hero";
import Features from "./Features";
import TopProducts from "./TopProducts";
import RecentsProduits from "./RecentsProduits";
import { useEffect } from "react";
import AOS from "aos";

const Home = () => {

  useEffect(() => {
    AOS.init({ 
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="duration-200">
      <Hero />
      <Features />
      <RecentsProduits />
      <TopProducts />
    </div>
  );
};

export default Home;
