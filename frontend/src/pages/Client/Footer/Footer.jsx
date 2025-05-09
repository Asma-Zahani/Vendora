import logo from "@/assets/logo/logo.svg";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router";
import FooterSection from "./FooterSection";
import Icon from "@/assets/logo/logo-ico.svg";
import BottomNavigation from "@/components/Header/BottomNavigation";

const Footer = () => {
    return (
        <>
            <footer className="relative bg-customLight dark:bg-customDark mb-16 sm:mb-0">
                <hr className="mt-4 border-t border-gray-300/50 backdrop-blur-sm sm:mx-auto dark:border-borderDark" />
                <div className="container py-6 mx-auto">
                    <div className="lg:flex-1">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                            <div className="lg:col-span-2">
                                <FooterSection hidden={true} title="Get in touch">
                                    <Link to="/" className="relative order-1 lg:order-none">
                                        <div className="absolute h-20 w-40 bg-cover bg-center rounded-md z-0 bg-image"/>
                                        <div style={{ backgroundImage: `url(${Icon})` }} className="absolute top-4.5 left-3 h-11 w-11 bg-cover bg-center rounded-md z-10"/>
                                        <img src={logo} alt="Logo" className="relative w-auto h-20 z-20" />
                                    </Link>
                                    <p className="lg:max-w-sm mt-2 ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        Rejoins notre communauté et reste informé des dernières offres, nouveautés et promotions exclusives sur notre boutique.
                                    </p>
                                    <div className="ml-6">
                                        <div className="block mt-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Mail size={17} />
                                                vendora.shop.contact@gmail.com
                                            </div>
                                        </div>
                                        <div className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Phone size={17} />
                                                +001 2233 456
                                            </div>
                                        </div>
                                        <div className="flex mt-4">
                                            <a className="mr-2 text-gray-600 dark:text-gray-400 transition-colors duration-300" href="#">
                                                <Instagram size={17} />
                                            </a>
                                            <a className="mx-2 text-gray-600 dark:text-gray-400 transition-colors duration-300" href="#">
                                                <Facebook size={17} />
                                            </a>
                                            <a className="mx-2 text-gray-600 dark:text-gray-400 transition-colors duration-300" href="#">
                                                <Linkedin size={17} />
                                            </a>
                                        </div>
                                    </div>
                                </FooterSection>
                            </div>

                            <FooterSection title="Horaires">
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Lundi :</strong> 8h30 - 18h00</p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Mardi :</strong> 8h30 - 18h00</p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Mercredi :</strong> 8h30 - 18h00</p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Jeudi :</strong> 8h30 - 18h00</p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Vendredi :</strong> 8h30 - 18h00</p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400"><strong>Samedi :</strong> 9h00 - 13h00</p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400"><strong>Dimanche :</strong> Fermé</p>
                            </FooterSection>

                            <FooterSection title="Légal">
                                <Link to="/mentions" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purpleLight">Mentions légales</Link>
                                <Link to="/confidentialite" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purpleLight">Politique de confidentialité</Link>
                                <Link to="/cgv" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purpleLight">Conditions générales de vente</Link>
                                <Link to="/cgu" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purpleLight">Conditions générales de l&apos;espace</Link>
                                <Link to="/protection" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purpleLight">Protection des données</Link>
                            </FooterSection>

                            <FooterSection title="Liens utiles">
                                <Link to="/boutique" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purpleLight">
                                    Boutique
                                </Link>
                                <Link to="/profil" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purpleLight">
                                    Mon profil
                                </Link>
                                <Link to="/contact" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purpleLight">
                                    Contact & Support
                                </Link>
                            </FooterSection>
                        </div>
                    </div>

                    <hr className="my-4 sm:my-6 border-gray-200 sm:mx-auto dark:border-borderDark" />
                    <div className="text-sm flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                        <div className="flex items-center">
                            Copyright {new Date().getFullYear()} © Vendora™.
                        </div>
                        <div>Fabriqué à la main & fait avec ❤️</div>
                    </div>
                </div>
            </footer>

            <div className="fixed bottom-0 left-0 right-0 sm:hidden">
                <BottomNavigation />
            </div>
        </>
    );
};

export default Footer;