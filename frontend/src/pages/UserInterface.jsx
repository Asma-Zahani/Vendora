/* eslint-disable no-unused-vars */
import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import ChatbotModal from "@/components/Chatbot/ChatbotModal";
import { ChevronsUp, MessageSquareMore } from "lucide-react";

const UserInterface = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setIsVisible(scrollTop > 200);
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="text-base dark:text-zinc-100 min-h-screen flex flex-col relative">
      <div className="absolute top-0 left-0 w-full z-100">
        <Header />
      </div>
      <div className="mt-15 sm:mt-20">
        <Outlet />
      </div>
      {isChatbotOpen && <ChatbotModal onClose={() => setIsChatbotOpen(false)} />}
      <div>
        <Footer />
      </div>
      <button onClick={() => setIsChatbotOpen(true)} className={`${isChatbotOpen ? 'hidden' : 'fixed'} bottom-17 sm:bottom-4 right-4 bg-purpleLight text-white px-3 sm:px-4 py-3 rounded-lg shadow-lg hover:scale-110 z-40`}>
        <div className="flex items-center justify-center gap-1"><MessageSquareMore size={25} /> <p className="hidden sm:flex">Discuter</p></div>
      </button>
      {isVisible && ( <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" })}} className="fixed bottom-30 sm:bottom-18 right-4 bg-contentLight dark:bg-contentDark border border-purpleLight text-purpleLight p-3 rounded-lg shadow-lg transition-all transform hover:scale-110 z-10">
          {/* <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray={100} strokeDashoffset={100 - scrollProgress} strokeLinecap="round"/>
          </svg> */}
          <ChevronsUp size={25} />
      </button>)}
    </div>
  );
};

export default UserInterface;