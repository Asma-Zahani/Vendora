import Hero from "./Hero";
import Features from "./Features";
import Products from "./Products";
import TopProducts from "./TopProducts";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
      <Products />
      <TopProducts />
    </div>
  );
};

export default Home;
