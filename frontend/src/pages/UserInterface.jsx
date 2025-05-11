import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import ChatbotModal from "@/components/Chatbot/ChatbotModal";
import { MessageSquareMore } from "lucide-react";

const UserInterface = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="text-base dark:text-zinc-100 min-h-screen flex flex-col relative">
      <div className="absolute top-0 left-0 w-full z-100">
        <Header />
      </div>
      <div className="mt-15 sm:mt-20">
        <Outlet />
      </div>
      <button onClick={() => setIsChatbotOpen(true)} className={`${isChatbotOpen ? 'hidden' : 'fixed'} bottom-4 right-4 bg-purpleLight text-white px-2 sm:px-4 py-2 rounded-lg shadow-lg hover:scale-110 z-40`}>
        <div className="flex items-center justify-center gap-1"><MessageSquareMore size={25} /> <p className="hidden sm:flex">Discuter</p></div>
      </button>
      {isChatbotOpen && <ChatbotModal onClose={() => setIsChatbotOpen(false)} />}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UserInterface;