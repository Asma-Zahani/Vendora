/* eslint-disable react/prop-types */
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import ImageUpload from "@/components/ui/ImageUpload";
import Dropdown from "@/components/ui/Dropdown";
import { Plus } from "lucide-react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import DeleteModal from "@/components/Modals/DeleteModal";

const FormModal = ({onClose, formLabel, action, formData, setFormData, fields, onSubmit, onDelete, errors}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showPalette, setShowPalette] = useState(false);
  const [color, setColor] = useColor("#561ecb");

  const toggleDropdown = (key) => {
    setActiveDropdown((prevKey) => (prevKey === key ? null : key));
  };

  const togglePalette = () => {
    setShowPalette(!showPalette);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true" />
      <div className="relative p-4 w-full max-w-lg max-h-full" data-aos="fade-down"data-aos-duration="500" data-aos-once="true">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-[0px_0px_6px_0px] shadow-gray-200 dark:shadow-borderGrayDark">
          <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-borderDark border-contentLight">
            <h3 className="text-xl font-semibold">{action} {formLabel?.slice(0, -1)}</h3>
            <button onClick={onClose} type="button" className="hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center">
              <CgClose size={20} />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4 max-h-[70vh] overflow-y-auto scrollbar">
            {fields.map(({ label, key, type, options, form, setForm, handleCreate }, index) => (
              <div key={index} className="mb-4 flex flex-col">
                <Label label={label} />
                {(type === "text" || type === "number" || type === "email" || type === "date" || type === "time") && (
                  <Input type={type} name={key} placeholder={`Enter ${label}`} value={formData[key] || ""} onChange={handleChange} required/>
                )}
                {type === "radio" && (
                  <div className="mt-1 flex justify-center space-x-6">
                    {options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center cursor-pointer">
                        <input type={type} value={option} checked={(form || formData[key]) === option} onChange={(e) => {if (setForm) {setForm(e.target.value)} else {handleRadioChange(key, e.target.value)} }} className="hidden"/>
                        <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                          {(form || formData[key]) === option && (
                            <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div>
                          )}
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-grayDark">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {type === "textarea" && (
                  <Textarea type={type} name={key} placeholder={`Enter ${label}`} value={formData[key] || ""} onChange={handleChange}/>
                )}
                {type === "image" && (
                  <ImageUpload label={formLabel} name={key} value={formData[key] || ""} onChange={(fileName) => setFormData({ ...formData, [key]: fileName })}/>
                )}
                {type === "dropdown" && options && (
                  <Dropdown label={label} name={key} options={options} selectedValue={formData[key] || ""} isOpen={activeDropdown === key} toggleOpen={() => toggleDropdown(key)}
                    onSelect={(selected) => {
                      setFormData({ ...formData, [key]: selected.value });
                      setActiveDropdown(null);
                    }}/>
                )}
                {type === "couleurs" && (
                  <div className="mt-1">
                    <div className="flex gap-2">
                      <div className="flex gap-2 overflow-y-auto scrollbar flex-grow pr-2">
                        {options.map((color) => (
                          <div key={color.couleur_id} className="relative">
                            <div style={{ backgroundColor: color.code_hex }} className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                                formData.couleurs && formData.couleurs.some(c => c.couleur_id === color.couleur_id) ? 'border-purpleLight' : 'border-borderGrayLight dark:border-borderGrayDark' }`}
                              onClick={() => {
                                setFormData((prevData) => {
                                  const couleurs = prevData.couleurs || [];
                                  if (!couleurs.some(c => c.couleur_id === color.couleur_id)) {
                                    return {
                                      ...prevData,
                                      couleurs: [...couleurs, color],
                                    };
                                  } else {
                                    return {
                                      ...prevData,
                                      couleurs: couleurs.filter(c => c.couleur_id !== color.couleur_id),
                                    };
                                  }
                                });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="relative w-8 h-8 rounded-full border-2 border-purpleLight shrink-0 ml-2 flex items-center justify-center cursor-pointer">
                        <Plus onClick={togglePalette} size={17}
                          className="text-purpleLight font-bold"
                          strokeWidth={3}
                        />
                        {showPalette && (
                          <div className="absolute bottom-full -right-2 mb-2 p-2 rounded shadow-lg z-50 bg-white">
                            <div className="space-y-2">
                              <div className="max-h-60 overflow-y-auto">
                                <ColorPicker
                                  color={color}
                                  onChange={(newColor) => {
                                    setColor(newColor);
                                    setForm({ ...form, code_hex: newColor.hex });
                                  }}
                                />
                              </div>
                              <input type="text" name="nom" placeholder="Nom de la couleur" value={form.nom || ""} 
                                onChange={(e) => setForm({ ...form, nom: e.target.value })} className="border border-gray-300 rounded p-1 w-full"/>
                            </div>
                            <div className="flex gap-2 justify-end mt-2">
                              <button onClick={togglePalette} className="px-4 py-1 border border-purpleLight text-purpleLight rounded">
                                Annuler
                              </button>
                              <button onClick={() => {handleCreate();togglePalette();}}className="px-4 py-1 bg-purpleLight text-white rounded">
                                Ajouter
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-3 ml-25">
                      {formData.couleurs?.map((selectedColor, index) => (
                        <div key={selectedColor.couleur_id} className="">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-borderGrayLight dark:border-borderGrayDark"
                              style={{ backgroundColor: selectedColor.code_hex }}/>
                            <span className="text-sm">{selectedColor.nom}</span>
                            <input type="number" placeholder="Quantité" value={selectedColor.quantite || ""} className="w-24 border border-gray-300 rounded"
                              onChange={(e) => {
                                const updatedColors = formData.couleurs.map((c) => c.couleur_id === selectedColor.couleur_id ? { ...c, quantite: e.target.value } : c );
                                setFormData({ ...formData, couleurs: updatedColors });
                              }}/>
                          </div>
                          {errors && errors[`couleurs.${index}.quantite`] && (
                              <p className="text-sm text-red-500 ml-4 mt-1">
                                  {errors[`couleurs.${index}.quantite`]}
                              </p>
                          )}
                        </div>
                      ))}             
                    </div>
                  </div>
                )}
                {errors && errors[key] && <p className="text-sm text-red-500 ml-4 -mb-3 mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div className={`flex items-center p-4 md:p-5 rounded-b dark:border-gray-600 ${onDelete? "justify-between" : "justify-end"}`}>
            {onDelete && <>
                <button type="button" onClick={() => {setIsDeleteOpen(true)}} className="border border-purpleLight text-purpleLight text-[14px] py-2 px-6 rounded-md">
                  Supprimer
                </button>
                {isDeleteOpen && <DeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} 
                  message={`Êtes-vous sûr de vouloir supprimer ce ${formLabel} ?`} onConfirm={() => {onDelete(); setIsDeleteOpen(false);}}
                />}
            </>}
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="border border-purpleLight text-purpleLight text-[14px] py-2 px-6 rounded-md">
                Annuler
              </button>
              <button type="button" onClick={onSubmit} className="bg-purpleLight dark:bg-purpleDark text-white dark:text-purpleLight text-[14px] py-2 px-6 rounded-md">
                {action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FormModal;