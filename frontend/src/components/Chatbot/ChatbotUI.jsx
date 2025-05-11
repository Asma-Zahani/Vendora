/* eslint-disable react/prop-types */
import Input from "@/components/ui/Input";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatbotUI = ({step, setStep, choix, setChoix, messages, formData, setFormData, isValid, handleSend}) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const container = endOfMessagesRef.current?.parentElement;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  const groupedMessages = messages.reduce((acc, msg) => {
    const date = (new Date(msg.timestamp)).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
    acc[date] = acc[date] || [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
      <div className="flex flex-col h-full">
          {(choix !== 1 && (step === 1 || step === 2)) && <>
              <div className="flex-1 overflow-y-auto scrollbar p-4 mb-18 sm:mb-0">
                  {Object.entries(groupedMessages).map(([date, msgs], i) => (
                  <div key={i} className="flex flex-col space-y-2">
                      <div className="text-center text-xs text-gray-500 my-2">{date}</div>
                      {msgs.map((msg, index) => (
                      <div key={index} className={`p-3 rounded-lg max-w-[70%] break-words whitespace-pre-wrap text-sm ${msg.sender === "user" ? "bg-purpleLight text-white self-end" : "bg-bgLight dark:bg-bgDark text-purpleLight self-start"}`}>
                          <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                          <span className="text-xs text-gray-400 block mt-1 text-right">
                          {(new Date(msg.timestamp)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                      </div>
                      ))}
                  </div>
                  ))}
                  <div ref={endOfMessagesRef} />
              </div>
              <div className="sticky bottom-0 bg-white dark:bg-customDark px-4 py-2 space-y-2">
                  {(choix === 0 && step === 1) && <>
                      <div onClick={() => {setStep(2); setChoix(1);}} className="relative">
                        <button type="button" className={`w-full border border-purpleLight text-purpleLight text-left px-2 py-3 rounded-md text-sm`}> 
                          Saisir les informations de la commande
                        </button>
                        <SendHorizonal onClick={() => console.log(formData.message)} size={22} className={`absolute inset-y-0 right-3 top-[25%] flex items-center text-purpleLight hover:scale-110`} />
                      </div>
                      <div onClick={() => {setChoix(3); handleSend("<p>Annuler</p>");}} className="relative">
                        <button type="button"  className={`w-full border border-purpleLight text-purpleLight text-left px-2 py-3 rounded-md text-sm`}>
                          Annuler
                        </button>
                        <SendHorizonal onClick={() => console.log(formData.message)} size={22} className={`absolute inset-y-0 right-3 top-[25%] flex items-center text-purpleLight hover:scale-110`} />
                      </div>
                      
                  </>}
                  {(choix === 2 && step === 1) &&
                    <button onClick={() => {setStep(2); setChoix(1);}} type="button" className={`w-full border border-purpleLight text-purpleLight text-left px-2 py-3 rounded-md text-sm`}> 
                      Suivre une autre commande
                    </button>
                  }
                  {(choix === 2 || choix === 3) && 
                    <div className="relative">
                      <input type="text" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Message" className={`mt-1 px-4 py-2 text-gray-700 dark:text-grayDark dark:bg-contentDark focus:outline-none rounded-md border border-gray-300 dark:border-borderDark placeholder:text-gray-300 dark:placeholder:text-grayDark w-full`} />
                      <SendHorizonal onClick={() => console.log(formData.message)} size={22} className={`absolute inset-y-0 right-3 top-[30%] flex items-center text-gray-700 dark:text-grayDark hover:scale-110 ${ !formData.message ? "opacity-50 cursor-not-allowed" : ""  }`} />
                    </div>}                
              </div>
          </>}
          {(choix === 1 && step === 2) && 
              <div className="min-h-[90vh] sm:min-h-[400px] flex flex-col justify-between">
                  <div className="px-4 pt-6 space-y-3">
                    <p className="text-lg font-semibold text-center">Suivre ma commande</p>
                    <p className="text-md text-gray-500 text-center">Veuillez fournir vos coordonnées.</p>

                    <Input type="number" value={formData.commande_id} onChange={(e) => setFormData({ ...formData, commande_id: e.target.value })} placeholder="Numéro de commande"/>
                    <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Adresse e-mail"/>
                  </div>
                  
                  <div className="p-4">
                    <button onClick={() => {setStep(1); setChoix(2); handleSend(`<p>Mon numéro de commande est #${formData.commande_id}.</p><p>Mon adresse e-mail est  ${formData.email}</p>`)}} type="button" className={`w-full bg-purpleLight text-white py-3 rounded-md text-sm ${ !isValid ? "opacity-50 cursor-not-allowed" : ""  }`}> 
                      Suivre ma commande
                    </button>
                  </div>
              </div>
              }

      </div>
  );
};

export default ChatbotUI;