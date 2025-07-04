/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Chatbot from "./Chatbot";
import ChatbotUI from "./ChatbotUI";
import { ArrowLeft, X } from "lucide-react";
import { createEntity } from "@/service/EntitesService";

const ChatbotModal = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const [choix, setChoix] = useState(0);

    const handlePreviousStep = () => {
        if (step === 3) {
            setStep(0);
        } else if (step > 0) {
            setStep(step - 1);
        }
        setChoix(0);
    };

    const [messages, setMessages] = useState([]);
    useEffect(() => {setMessages(localStorage.getItem("chat_messages") ? JSON.parse(localStorage.getItem("chat_messages")) : []);}, []);

    const [formData, setFormData] = useState({commande_id: '', email: '', message: ''}); 
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(formData.email.trim()) && formData.commande_id.trim() !== "");
    }, [formData]);

    const handleSend = (userMessage) => {
        const now = (new Date()).toISOString();
        const newMessages = [
          ...messages,
          { sender: "user", text: userMessage, timestamp: now },
          { sender: "bot", text: "...", timestamp: now },
        ];
    
        setMessages(newMessages);
        localStorage.setItem("chat_messages", JSON.stringify(newMessages));
    
        setTimeout(async () => {
          let responseText;
          if (userMessage === "<p>Annuler</p>") {
            responseText = "<p>N'hésitez pas à nous écrire directement si vous avez des questions. Nous serons ravis de vous aider.</p>";
          } else if (userMessage === "<p>Suivre ma commande</p>") {
            responseText = "<p>Pour voir le statut de votre commande, veuillez fournir les informations de celle-ci.</p>";
          } else if (userMessage.startsWith("<p>Mon numéro de commande est")) {
            const data = await createEntity("trackCommande", formData);
            responseText = data.message;
            setFormData({commande_id: '', email: '', message: ''});
          } else {
            responseText = "<p>Merci pour votre message. Nous vous répondrons par email dans les plus brefs délais.</p>";
          }
          const replaced = newMessages.slice(0, -1).concat({
            sender: "bot",
            text: responseText,
            timestamp: (new Date()).toISOString(),
          });
    
          setMessages(replaced);
          localStorage.setItem("chat_messages", JSON.stringify(replaced));
        }, 1000);
    };

    return (
        <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 bg-customLight dark:bg-customDark w-full sm:h-auto sm:w-90 h-full sm:rounded-xl shadow-lg z-100">
            <div className="px-4 py-5 sm:rounded-t-xl text-white bg-purpleLight">
                <div className="flex justify-between items-center">
                    <button onClick={handlePreviousStep} className={`${step === 0 ? 'hidden' : ''}`}>
                        <ArrowLeft size={18} />
                    </button>
                    
                    {step === 0 
                        ? <div>
                            <h2 className="font-bold text-lg">Discutez avec nous</h2>
                            <h2 className="text-md">Aslema 👋</h2>
                        </div>
                        : <h2 className="font-bold text-sm">Vendora</h2>
                    }
                    <button onClick={onClose} className={`${step === 0 ? '-mt-8' : ''}`}>
                        <X size={18} />
                    </button>
                </div>
                {step === 0 && 
                    <button onClick={() => setStep(1)} type="button" className={`w-full border dark:border-gray-400 mt-4 px-2 py-3 rounded-md text-sm transform transition duration-200 hover:scale-105`}> 
                        Revenir au chat
                    </button>
                }
            </div>
            <div className={`${step === 0 ? '' : 'max-h-full h-full sm:h-[400px] sm:max-h-[400px]'}`}>
                <div className="rounded-xl shadow-md max-w-sm mx-auto flex flex-col h-full">                    
                    {step === 0 &&
                        <div className="flex flex-col items-center">
                            <p className="mt-4">Réponses instantanées</p>
                            <div className="space-y-2 p-4">
                                <button onClick={() => {handleSend("<p>Suivre ma commande</p>"); setStep(1)}} type="button" className={`w-full border border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 text-left px-4 py-3 rounded-md text-sm transform transition duration-200 hover:scale-105`}> 
                                    Suivre ma commande
                                </button>
                                <button onClick={() => setStep(3)} type="button" className={`w-full border border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 text-left px-4 py-3 rounded-md text-sm transform transition duration-200 hover:scale-105`}> 
                                    Produits recommandés
                                </button>
                            </div>
                        </div>
                    }
                    {step <= 2 
                        ? (<ChatbotUI step={step} setStep={setStep} choix={choix} setChoix={setChoix} messages={messages} handleSend={handleSend} formData={formData} setFormData={setFormData} isValid={isValid} />) 
                        : (<div className="overflow-y-auto scrollbar">
                            <Chatbot step={step} setStep={setStep} />
                        </div>)}
                </div>
            </div>
        </div>
    );
};

export default ChatbotModal;