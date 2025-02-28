/* eslint-disable react/prop-types */
import { Link } from "react-router";
import EmptyCardState from "./EmptyCardState";
import img from "@/assets/default/image.png";

const CartTable = ({ formData, setFormData }) => {

    return (
        <section className="mx-6 py-6">
            <div className="flex flex-col">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                        {formData?.produits && formData.produits.length > 0 ? (
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="border border-gray-300 px-4 py-2">Produit</th>
                                        <th className="border border-gray-300 px-4 py-2">Nom</th>
                                        <th className="border border-gray-300 px-4 py-2">Prix</th>
                                        <th className="border border-gray-300 px-4 py-2">Quantité</th>
                                        <th className="border border-gray-300 px-4 py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.produits.map((produit, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border border-gray-300 px-4 py-2">
                                                <img src={produit.image} alt={produit.nom} onError={(e) => e.target.src = img} className="w-16 h-16 object-cover mx-auto" />
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">{produit.nom}</td>
                                            <td className="border border-gray-300 px-4 py-2">${produit.prix}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <button className="px-2 py-1 bg-gray-300 rounded">-</button>
                                                <span className="mx-2">{produit.quantite}</span>
                                                <button className="px-2 py-1 bg-gray-300 rounded">+</button>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">${produit.prix * produit.quantite}</td>
                                        </tr>
                                    ))}
                                    <tr className="text-center">
                                        <td colSpan="3" className="py-2 px-4 border border-gray-300 text-start">
                                            <input type="text" placeholder="Entrez le coupon" className="py-1.5 px-4 rounded-l-lg border border-r-0"/>
                                            <button className="bg-blue-600 py-[7px] px-4 rounded-r-lg text-white">Appliquer</button>
                                        </td>
                                        <td className="border border-gray-300 py-2 font-semibold text-xl">Prix Total:</td>
                                        <td className="border border-gray-300 py-2 font-semibold">${formData.produits.reduce((total, produit) => total + produit.prix * produit.quantite, 0)}</td>
                                    </tr>
                                    <tr className="py-2 text-center">
                                        <td colSpan="4" className="py-3 px-4 border border-gray-300 text-end">
                                            <Link to={"/shop"} className="bg-orange-600 py-2 px-4 rounded-lg text-white">Continuer vos achats</Link>
                                        </td>
                                        <td className="py-3">
                                            <Link to={""} className="bg-green-600 py-2 px-4 rounded-lg text-white">Passer à la caisse</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <EmptyCardState />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartTable;
