/* eslint-disable no-constant-binary-expression */
import { Gift } from "lucide-react";

const Offres = () => {
    
    return (
        <div className="col-span-2 w-full py-2">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                {false && <h1 className="text-lg font-semibold mb-4">Offres</h1>}
                <div className="grid grid-cols-1 gap-4 rounded-lg">
                    <div className="flex items-center justify-center text-center h-95">
                        <div className="flex flex-col max-w-lg">
                            <div className="p-3 mx-auto text-purpleLight">
                                <Gift size={80} />
                            </div>
                            <h1 className="mt-3 text-2xl font-semibold uppercase text-gray-800 dark:text-white">Aucune offre disponible</h1>
                            <div className="pt-2 text-sm">
                                <p>Aucune offre n&apos;est disponible pour le moment.</p>
                                <p>Revenez plus tard pour découvrir nos prochaines promotions et avantages exclusifs !</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offres;
