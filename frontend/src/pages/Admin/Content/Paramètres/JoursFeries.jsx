import Header from "../Header";
import { CalendarDaysIcon } from "lucide-react";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewMonthGrid } from "@schedule-x/calendar";
//import { createEventModalPlugin } from "@schedule-x/event-modal";
//import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import '@schedule-x/theme-default/dist/index.css';
import FormModal from "@/components/Modals/FormModal";
import { useEffect, useState } from "react";
import { getJoursFeries, createJourFerie } from "@/service/JourFerieService";

const JoursFeries = () => {
  const [joursFeries, setJoursFeries] = useState([]);
  useEffect(() => { (async () => setJoursFeries(await getJoursFeries()))()}, [joursFeries]);

  
  const [holidays, setHolidays] = useState([
    { id: "1", title: "Nouvel An", start: "2025-01-01", end: "2025-01-01" },
    { id: "2", title: "Fête du Travail", start: "2025-05-01", end: "2025-05-01" },
    { id: "3", title: "Noël", start: "2025-12-25", end: "2025-12-25" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ title: "", start: "", end: "" });

 
  const handleAddHoliday = async () => {
    try {
      // Ajouter d'abord dans la base de données
      const newJourFerie = await createJourFerie(newHoliday);
  
      // Mise à jour de l'état seulement si la requête réussit
      setHolidays((prevHolidays) => [...prevHolidays, { ...newJourFerie, id: `${newJourFerie.id}` }]);
      setJoursFeries((prevJoursFeries) => [...prevJoursFeries, newJourFerie]);
  
      alert(`Jour férié ajouté avec succès`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du jour férié :", error);
      alert("Une erreur est survenue lors de l'ajout du jour férié");
    }
  
    // Fermer la modal et réinitialiser les données du formulaire
    setIsModalOpen(false);
    setNewHoliday({ title: "", start: "", end: "" });
  };
  

  // Créer ou recréer l'instance du calendrier chaque fois que holidays change
  const calendar = useCalendarApp({
    views: [createViewMonthGrid()],
    events: holidays,
    selectedDate: "2025-01-01",
    /*plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],*/
    callbacks: {
      onClickDate(date) {
        console.log("Jour sélectionné :", date);
        setNewHoliday((prevHoliday) => {
          return { ...prevHoliday, start: date, end: date };
        });
        setIsModalOpen(true);
      },
    },
  });

  return (
    <>
      <Header title="Jours fériés" icon={CalendarDaysIcon} parent="Paramètres" current="Jours fériés" />
      <div className="ml-4 my-4">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>

      {isModalOpen && (
        <FormModal formLabel="Jour férié" header={true} action="Ajouter" onClose={() => setIsModalOpen(false)} onSubmit={handleAddHoliday} 
          formData={newHoliday} setFormData={setNewHoliday}
          fields={[
            { label: "Titre", key: "title", type: "text", value: newHoliday.title },
            /*{ label: "Date de début", key: "start", type: "date", value: newHoliday.start },*/
          ]}
        />
      )}
    </>
  );
};

export default JoursFeries;
