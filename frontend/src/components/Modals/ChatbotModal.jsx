import Chatbot from "./Chatbot";
import { X } from "lucide-react";

const ChatbotModal = ({ onClose }) => {

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-lg border z-50">
            <div className="flex justify-between items-center p-2 border-b">
                <h2 className="font-bold text-sm">🤖 Assistant Produit</h2>
                <button onClick={onClose}>
                    <X size={18} />
                </button>
            </div>
            <div className="p-2 max-h-[400px] overflow-y-auto">
                <Chatbot />
            </div>
        </div>
    );
};

export default ChatbotModal;
