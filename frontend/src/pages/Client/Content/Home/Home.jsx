import Hero from "./Hero";
import Features from "./Features";
import Footer from "../../Footer/Footer";
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
    <div className="bg-customLight dark:bg-customDark duration-200">
      <Hero />
      <Products />
      <TopProducts />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
