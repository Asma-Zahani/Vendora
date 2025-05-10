/* eslint-disable react/prop-types */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useEffect, useRef, useState } from "react";

const getTime = () => {
  const now = new Date();
  return now.toISOString();
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
};

const ChatbotUI = ({step, setStep}) => {
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null);
  const [formData, setFormData] = useState({num: '', email: ''}); 

  // 🔹 Scroller à la fin à chaque mise à jour des messages
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const saved = localStorage.getItem("chat_messages");
    const existing = saved ? JSON.parse(saved) : [];

    const now = getTime();
    const newEntry = [{ sender: "user", text: "Suivre ma commande", timestamp: now }];
    const updated = [...existing, ...newEntry];

    setMessages(updated);
    localStorage.setItem("chat_messages", JSON.stringify(updated));

    setTimeout(() => {
      const replaced = updated.slice(0, -1).concat({
        sender: "bot",
        text: "Pour voir le statut de votre commande, veuillez fournir les informations de celle-ci.",
        timestamp: getTime(),
      });
      setMessages(replaced);
      localStorage.setItem("chat_messages", JSON.stringify(replaced));
    }, 1000);
  }, []);

  const handleSend = (userMessage) => {
    const now = getTime();
    const newMessages = [
      ...messages,
      { sender: "user", text: userMessage, timestamp: now },
      { sender: "bot", text: "...", timestamp: now },
    ];

    setMessages(newMessages);
    localStorage.setItem("chat_messages", JSON.stringify(newMessages));

    setTimeout(() => {
      const responseText =
        userMessage === "Annuler"
          ? "N'hésitez pas à nous écrire directement si vous avez des questions. Nous serons ravis de vous aider."
          : "Pour voir le statut de votre commande, veuillez fournir les informations de celle-ci.";

      const replaced = newMessages.slice(0, -1).concat({
        sender: "bot",
        text: responseText,
        timestamp: getTime(),
      });

      setMessages(replaced);
      localStorage.setItem("chat_messages", JSON.stringify(replaced));
    }, 1000);
  };

  const groupedMessages = messages.reduce((acc, msg) => {
    const date = formatDate(msg.timestamp);
    acc[date] = acc[date] || [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full">
        {step === 1 && <>
            <div className="flex-1 overflow-y-auto scrollbar p-4 mb-12 sm:mb-0">
                {Object.entries(groupedMessages).map(([date, msgs], i) => (
                <div key={i} className="flex flex-col space-y-2">
                    <div className="text-center text-xs text-gray-500 my-2">{date}</div>
                    {msgs.map((msg, index) => (
                    <div key={index} className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.sender === "user" ? "bg-purpleLight text-white self-end" : "bg-bgLight dark:bg-bgDark text-purpleLight self-start"}`}>
                        <p>{msg.text}</p>
                        <span className="text-xs text-gray-400 block mt-1 text-right">
                        {formatTime(msg.timestamp)}
                        </span>
                    </div>
                    ))}
                </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
            <div className="sticky bottom-0 bg-white dark:bg-customDark p-4 space-y-2">
                <Button onClick={() => {setStep(2); handleSend("Saisir les informations de la commande")}} isValid={true} text="Saisir les informations de la commande"/>
                <Button onClick={() => handleSend("Annuler")} isValid={true} text="Annuler" />
            </div></>}
        {step === 2 && <>
            <div className="flex flex-col items-center p-4">
                <p className="text-lg font-semibold">Suivre ma commande</p>
                <p className="text-md text-gray-500">Veuillez fournir vos coordonnées.</p>
                
                <Input type="text" value={formData.num} onChange={(e) => setFormData({ ...formData, num: e.target.value })} placeholder="#1234"/>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Test@gmail.com"/>
            </div>
            <div className="sticky bottom-0 bg-white dark:bg-customDark p-4">
                <Button onClick={() => {setStep(2); handleSend("Saisir les informations de la commande")}} isValid={true} text="Suivre ma commande"/>
            </div>
        </>}
    </div>
  );
};

export default ChatbotUI;