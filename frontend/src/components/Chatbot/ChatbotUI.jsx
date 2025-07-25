/* eslint-disable react/prop-types */
import Input from "@/components/ui/Input";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatbotUI = ({step, setStep, choix, setChoix, messages, formData, setFormData, isValid, handleSend}) => {
  const endOfMessagesRef = useRef(null);

  const textareaRef = useRef(null);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, []);

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
    const msgDate = new Date(msg.timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    let dateLabel;
    if (isSameDay(msgDate, today)) {dateLabel = "Aujourd'hui";} 
    else if (isSameDay(msgDate, yesterday)) { dateLabel = "Hier";} 
    else {dateLabel = msgDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });}

    acc[dateLabel] = acc[dateLabel] || [];
    acc[dateLabel].push(msg);
    return acc;
  }, {});

  return (
      <div className="flex flex-col h-full">
          {(choix !== 1 && (step === 1 || step === 2)) && <>
              <div className="flex-1 overflow-y-auto scrollbar p-4 mb-13 sm:-mb-2">
                  {Object.entries(groupedMessages).map(([date, msgs], i) => (
                  <div key={i} className="flex flex-col space-y-2">
                      <div className="text-center text-xs text-gray-500 my-2">{date}</div>
                      {msgs.map((msg, index) => (
                      <div key={index} className={`px-3 py-2 rounded-lg max-w-[70%] break-words whitespace-pre-wrap text-sm ${msg.sender === "user" ? "bg-purpleLight text-white self-end" : "bg-gray-100 dark:bg-borderGrayDark self-start"}`}>
                          <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                          <span className={`text-xs text-gray-400 block ${msg.sender === "user" ? '' : 'text-right'}`}>
                          {(new Date(msg.timestamp)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                      </div>
                      ))}
                  </div>
                  ))}
                  <div ref={endOfMessagesRef} />
              </div>
              <div className="sticky bottom-0 bg-white dark:bg-customDark px-4 py-2 pb-3 space-y-2 rounded-b-xl">
                  {(choix === 0 && step === 1) && <>
                      <div onClick={() => {setStep(2); setChoix(1);}} className="relative group transform transition duration-200 hover:scale-105">
                        <button type="button" className={`w-full border border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 text-left px-2 py-3 rounded-md text-sm`}> 
                          Saisir les informations de la commande
                        </button>
                        <SendHorizonal size={22} className={`absolute inset-y-0 right-3 top-[25%] flex items-center text-gray-600 dark:text-gray-400 group-hover:scale-105 transform transition duration-200`} />
                      </div>
                      <div onClick={() => {setChoix(3); handleSend("<p>Annuler</p>");}} className="relative group transform transition duration-200 hover:scale-105">
                        <button type="button"  className={`w-full border border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 text-left px-2 py-3 rounded-md text-sm`}>
                          Annuler
                        </button>
                        <SendHorizonal size={22} className={`absolute inset-y-0 right-3 top-[25%] flex items-center text-gray-600 dark:text-gray-400 group-hover:scale-105 transform transition duration-200`} />
                      </div>
                      
                  </>}
                  {(choix === 2 && step === 1) &&
                    <button onClick={() => {setStep(2); setChoix(1);}} type="button" className={`w-full border border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 text-left px-2 py-3 rounded-md text-sm transform transition duration-200 hover:scale-105`}> 
                      Suivre une autre commande
                    </button>
                  }
                  {(choix === 2 || choix === 3) && 
                    <div className="relative">
                      <textarea ref={textareaRef} value={formData.message} placeholder="Message" maxLength={350} rows={1} className={`mt-1 px-4 py-2 pr-10 pb-6 text-gray-700 dark:text-grayDark dark:bg-contentDark focus:outline-none focus:border-gray-600 dark:focus:border-gray-400 hover:border-gray-600 dark:hover:border-gray-400 rounded-md border border-gray-300 dark:border-borderDark placeholder:text-gray-300 dark:placeholder:text-grayDark w-full resize-none break-words whitespace-pre-wrap overflow-hidden`}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });                                          
                          autoResizeTextarea();
                        }} />
                        {formData.message.length >= 350 && (
                          <div className="absolute text-xs bottom-3 left-2 text-red-500">
                            Vous avez atteint la limite de caractères autorisée
                          </div>
                        )}
                      <SendHorizonal onClick={() => {handleSend(`<p>${formData.message}</p>`); setFormData({ ...formData, message: '' });}} size={22} className={`absolute bottom-1 -translate-y-1/2 right-3 text-gray-700 dark:text-grayDark ${!formData.message ? "opacity-50 cursor-not-allowed" : "hover:scale-110 transition"}`} />
                    </div>
                  }           
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
                    <button onClick={() => {setStep(1); setChoix(2); handleSend(`<p>Mon numéro de commande est #${formData.commande_id}.</p><p>Mon adresse e-mail est  ${formData.email}</p>`)}} type="button" className={`w-full bg-purpleLight text-white py-3 rounded-md text-sm ${ !isValid ? "opacity-50 cursor-not-allowed" : "transform transition duration-200 hover:scale-105"  }`}> 
                      Suivre ma commande
                    </button>
                  </div>
              </div>
              }

      </div>
  );
};

export default ChatbotUI;