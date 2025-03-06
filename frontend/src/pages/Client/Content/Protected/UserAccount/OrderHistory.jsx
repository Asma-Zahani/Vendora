import { useContext, useEffect, useState } from "react";
import UserContext from '@/utils/UserContext';

const OrderHistory = () => {
    const { user } = useContext(UserContext);

    const [commandes, setCommandes] = useState(null);

    useEffect(() => {
        setCommandes(user.commandes);
        console.log(user.commandes)
    }, [user]); 

    return (
        <div className="col-span-2 w-full py-2 space-y-5">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                <h1 className="text-lg font-semibold mb-4">Historique des commandes</h1>
                <div className="grid grid-cols-1 gap-4 rounded-lg">
                    {/* test */}
                    {commandes?.length > 0 && (
                        commandes.map((commande, index) => (
                            <div key={index}>hello</div>
                        ))
                    )}
                </div>
            </div>
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                <h1 className="text-lg font-semibold mb-4">Historique des commandes</h1>
                <div className="grid grid-cols-1 gap-4 rounded-lg">
                    {/* test */}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
