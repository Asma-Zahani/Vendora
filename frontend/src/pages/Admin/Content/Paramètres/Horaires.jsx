import Header from "../Header";
import { Clock, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getHoraires, updateHoraire } from "@/service/HoraireService";
import { createPeriodeHoraire, updatePeriodeHoraire, deletePeriodeHoraire } from "@/service/PeriodeHoraireService";
import FormModal from "@/components/Modals/FormModal";
import DeleteModal from "@/components/Modals/DeleteModal";

const Horaires = () => {
  const [horaires, setHoraires] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({ periode_horaire_id: '', horaire_id: '', heureDebut: '', heureFin: '' });

  useEffect(() => {
    (async () => setHoraires(await getHoraires()))();
  }, []);

  const handleEdit = (updatedHoraire) => {
    try {
      updateHoraire(updatedHoraire.horaire_id, updatedHoraire);

      setHoraires((prevHoraires) =>
        prevHoraires.map((horaire) =>
          horaire.horaire_id === updatedHoraire.horaire_id ? updatedHoraire : horaire
        )
      );

      console.log(`Horaire avec l'ID ${updatedHoraire.horaire_id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification de l'horaire");
    }
  };

  const toggleOuvert = async (id, currentState) => {
    const updatedHoraire = horaires.find((horaire) => horaire.horaire_id === id);
    if (!updatedHoraire) return;

    const newHoraire = { ...updatedHoraire, ouvert: !currentState };
    handleEdit(newHoraire);
  };

  const handlePeriodeCreate = async () => {
    try {      
      await createPeriodeHoraire(formData);
      setHoraires((prevHoraires) =>
        prevHoraires.map((horaire) => {
          // Si l'horaire correspond à celui où la période a été ajoutée
          if (horaire.horaire_id === formData.horaire_id) {
            // Ajouter la nouvelle période aux périodes existantes
            return {
              ...horaire,
              periodes_horaires: [
                ...horaire.periodes_horaires,
                { heureDebut: formData.heureDebut, heureFin: formData.heureFin },
              ],
            };
          }
          return horaire;
        })
      );  
      alert(`Période ajouté avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du periode');
    }

    setFormData({ horaire_id: '', heureDebut: '', heureFin: '' });
    setIsModalOpen(false);
  };

  const handlePeriodeEdit = async () => {
    try {
      await updatePeriodeHoraire(formData.periode_horaire_id,formData);
      setHoraires(await getHoraires()); 
      alert(`Période ajouté avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du période');
    }

    setFormData({ periode_horaire_id: '', horaire_id: '', heureDebut: '', heureFin: '' });
    setIsModalOpen(false);
  };

  const handlePeriodeDelete = async () => {
    try {
      await deletePeriodeHoraire(formData.periode_horaire_id);
      setHoraires(await getHoraires()); 
      alert(`Période supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du période');
    }

    setFormData({ periode_horaire_id: '', horaire_id: '', heureDebut: '', heureFin: '' });
    setIsDeleteOpen(false);
  };

  return (
    <>
      <Header title="Horaires" icon={Clock} parent="Paramètres" current="Horaires" />
      <section className="mx-6 py-6">
        <div className="flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
              <div className="sm:flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Horaires d&apos;ouverture
                </h2>
              </div>
              <div className="mt-6 py-2 flex flex-col w-full max-w-sm sm:max-w-[310px] md:max-w-3xl w-990:max-w-[650px] lg:max-w-full overflow-y-auto">
                <div className="overflow-x-auto scrollbar">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-contentLight dark:border-borderDark">
                        <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 px-4">
                          Jour
                        </th>
                        <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 px-4">
                          Ouvert/Fermé
                        </th>
                        <th className="py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 px-4">
                          Horaires
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {horaires.map((item) => (
                        <tr key={item.horaire_id} className="border-b border-contentLight dark:border-borderDark">
                          <td className="py-4 text-sm whitespace-nowrap px-4">
                            <h4 className="text-gray-700 dark:text-gray-200">{item.jour}</h4>
                          </td>
                          <td className="py-4 text-sm whitespace-nowrap px-4">
                            <label className="flex items-center cursor-pointer">
                              <input type="checkbox" checked={item.ouvert} onChange={() => toggleOuvert(item.horaire_id, item.ouvert)} className="sr-only" />
                              <div className={`w-20 h-5 flex items-center rounded-full transition-all duration-300 ${
                                item.ouvert ? "bg-purpleLight p-1" : "bg-gray-300 dark:bg-gray-400" }`}>
                                {item.ouvert ? <div className="absolute text-white">Ouvert</div> : <div className="absolute ml-7 text-white">Fermé</div>}
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                  item.ouvert ? "translate-x-12" : "" }`}></div>
                              </div>
                            </label>
                          </td>
                          
                          <td className="py-4 text-sm whitespace-nowrap px-4 space-y-2">
                            {item.periodes_horaires && item.periodes_horaires.length > 0 &&
                              item.periodes_horaires.map((periode, index) => {
                                if (item.ouvert) { 
                                  return (
                                    <div key={index} className="flex items-center space-x-2">
                                      <input type="time" readOnly value={periode.heureDebut} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
                                      <input type="time" readOnly value={periode.heureFin} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
                                      <button onClick={() => {setFormData({ periode_horaire_id: periode.periode_horaire_id,horaire_id: periode.horaire_id, heureDebut: periode.heureDebut, heureFin: periode.heureFin }); setIsModalOpen(true)}} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                          </svg>
                                      </button>
                                      <button onClick={() => {setFormData({ periode_horaire_id: periode.periode_horaire_id}); setIsDeleteOpen(true)}} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                          </svg>
                                      </button>
                                    </div>
                                  );
                                }
                              })
                            }
                            <button disabled={!item.ouvert} onClick={() => {setFormData({ horaire_id: item.horaire_id, heureDebut: '', heureFin: '' }); setIsModalOpen(true)}} className={`flex items-center px-4 py-2 text-sm text-purpleLight border border-purpleLight rounded-md gap-x-2 ${ !item.ouvert ? "opacity-50 cursor-not-allowed" : ""  }`}>
                              <Plus size={17} /> <span>Ajouter période</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isModalOpen && (
                    <FormModal 
                      isOpen={isModalOpen} 
                      onClose={() => setIsModalOpen(false)} 
                      formLabel="Période horaires" 
                      action={formData.periode_horaire_id ? "Modifier" : "Ajouter"}
                      formData={formData} 
                      setFormData={setFormData} 
                      fields={[
                        { label: "Heure de début", key: "heureDebut", type: "time", value: formData.heureDebut },
                        { label: "Heure de fin", key: "heureFin", type: "time", value: formData.heureFin },
                      ]}
                      onSubmit={formData.periode_horaire_id ? handlePeriodeEdit : handlePeriodeCreate}
                    />
                  )}
                  {isDeleteOpen && 
                    <DeleteModal 
                      isOpen={isDeleteOpen} 
                      onClose={() => setIsDeleteOpen(false)} 
                      onConfirm={() => handlePeriodeDelete()} 
                      message={`Êtes-vous sûr de vouloir supprimer ce période ?`}
                    /> 
                  }                                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Horaires;
