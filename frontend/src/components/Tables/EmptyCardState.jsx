import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

const EmptyCardState = () => {
    return (
        <div className="flex items-center justify-center text-center h-80">
            <div className="flex flex-col max-w-sm">
                <div className="p-3 mx-auto text-purpleLight">
                    <ShoppingCart size={80} />
                </div>
                <h1 className="mt-3 text-2xl font-semibold uppercase text-gray-800 dark:text-white">votre panier est vide</h1>
                <div className="flex items-center justify-center mt-4 gap-x-3">
                    <Link to={"/shop"} className="flex items-center px-4 py-2 text-sm text-white bg-purpleLight rounded-md gap-x-2">
                        <span className="text-lg">Acheter maintenant</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmptyCardState;
