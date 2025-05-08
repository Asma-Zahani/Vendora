import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import LightImage from "@/assets/contact/Contact-us-light.png";
import DarkImage from "@/assets/contact/Contact-us-dark.png";
import { useContext, useState } from "react";
import ThemeContext from '@/utils/ThemeContext';
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { createEntity } from "@/service/EntitesService";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext"

const Contact = () => {
    const { theme } = useContext(ThemeContext);
    const [formData, setFormData] = useState({ nom: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
        const { setSuccessMessage } = useContext(SuccessMessageContext);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({}); setSuccessMessage("");
      const data = await createEntity("contact", formData);
      
      if (data.errors) {
          setErrors(data.errors);
      } else if (data.message) {
          setSuccessMessage(data.message);
          setFormData({ nom: "", email: "", message: "" });
      }
    };

    return (
        <section className="min-h-screen">
            <div className="container px-6 py-20 mx-auto">
                <div className="lg:flex lg:items-center lg:-mx-10">
                    <div className="lg:w-1/2 lg:mx-10">
                        <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">Discutons</h1>

                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Posez-nous toutes vos questions, nous serons ravis de vous répondre.
                        </p>

                        <form className="mt-12" onSubmit={handleSubmit}>
                            <div className="-mx-2 md:items-center md:flex">
                                <div className="flex-1 px-2">
                                    <Label label="Nom complet" />
                                    <Input type="text" name="nom" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} placeholder="Jean Dupont" error={errors.nom} required />
                                </div>

                                <div className="flex-1 px-2 mt-4 md:mt-0">
                                    <Label label="Adresse e-mail" />
                                    <Input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="exemple@email.com" error={errors.email} required />
                                </div>
                            </div>

                            <div className="w-full my-4">
                                <Label label="Message" />
                                <Textarea placeholder="Votre message" rows="8" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                            </div>
                            <Button isValid={true} text="Envoyer le message" />
                        </form>
                    </div>

                    <div className="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
                        <img className="hidden object-cover mx-auto rounded-full lg:block shrink-0 w-96 h-96" src={theme === "light" ? LightImage : DarkImage} alt="Contact" />

                        <div className="mt-6 space-y-8 md:mt-8">
                            <p className="flex items-start -mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-purpleLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                                    Cecilia Chapman, 711-2880 Nulla St. Mankato, Mississippi 96522
                                </span>
                            </p>

                            <p className="flex items-start -mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-purpleLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>

                                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">(257) 563-7401</span>
                            </p>

                            <p className="flex items-start -mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-purpleLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">vendora.shop.contact@gmail.com</span>
                            </p>
                        </div>

                        <div className="mt-6 w-80 md:mt-8">
                            <h3 className="text-gray-600 dark:text-gray-300">Suivez-nous</h3>

                            <div className="flex mt-4 -mx-1.5 space-x-5">
                                <a className="text-gray-600 dark:text-gray-400 transition-colors duration-300 transform hover:text-purpleLight" href="#">
                                    <Twitter className="w-6 h-6" />
                                </a>

                                <a className="text-gray-600 dark:text-gray-400 transition-colors duration-300 transform hover:text-purpleLight" href="#">
                                    <Linkedin className="w-6 h-6" />
                                </a>

                                <a className="text-gray-600 dark:text-gray-400 transition-colors duration-300 transform hover:text-purpleLight" href="#">
                                    <Facebook className="w-6 h-6" />
                                </a>

                                <a className="text-gray-600 dark:text-gray-400 transition-colors duration-300 transform hover:text-purpleLight" href="#">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;