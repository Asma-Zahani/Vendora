/* eslint-disable react/prop-types */
import { useState } from "react";
import Chatbot from "./Chatbot";
import ChatbotUI from "./ChatbotUI";
import { Bot } from "lucide-react";
import { ArrowLeft, X } from "lucide-react";
import Button from "@/components/ui/Button";

const ChatbotModal = ({ onClose }) => {
    const [step, setStep] = useState(0);
    return (
        <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 bg-customLight dark:bg-customDark w-full sm:h-auto sm:w-[50vh] h-full sm:rounded-xl shadow-lg z-100">
            <div className="flex justify-between items-center px-4 py-5 sm:rounded-t-xl text-white bg-purpleLight">
                <button onClick={() => setStep(0)} className="">
                    <ArrowLeft size={18} />
                </button>
                <h2 className="font-bold text-sm">Vendora</h2>
                <button onClick={onClose}>
                    <X size={18} />
                </button>
            </div>
            <div className="max-h-full sm:max-h-[65vh] overflow-y-auto scrollbar">
                <div className="p-2 rounded-xl shadow-md max-w-md mx-auto mt-4 flex flex-col h-full">
                    <h2 className="flex flex-col justify-center items-center text-2xl font-semibold mb-6 text-center space-y-2">
                        <Bot size={30} /> 
                        <p className="max-w-[15rem]">Assistant Recommandation</p>
                    </h2>
                    
                    {step === 0 &&
                        <div className="space-y-2 mb-6">
                            <Button onClick={() => setStep(1)} isValid={true} text="Suivre ma commande" />
                            <Button onClick={() => setStep(2)} isValid={true} text="Produits recommandés" />
                        </div> 
                    }
                    {step <= 3 ? (<ChatbotUI step={step} setStep={setStep} />) : (<Chatbot step={step} setStep={setStep} />)}
                </div>
            </div>
        </div>
    );
};

export default ChatbotModal;