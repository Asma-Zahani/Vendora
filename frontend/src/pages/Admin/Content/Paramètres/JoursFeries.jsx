/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import { CalendarDaysIcon } from "lucide-react";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import FormModal from "@/components/Modals/FormModal";
import { getJoursFeries, createJourFerie, updateJourFerie, deleteJourFerie } from "@/service/JourFerieService";

const JoursFeries = () => {
  const calendarEl = useRef(null);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ jour_ferie_id: '', title: '', start: '', end: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJoursFeries = async () => {
      try {
        const joursFeries = await getJoursFeries();
        setEvents(joursFeries);
      } catch (error) {
        console.error("Erreur lors du chargement des jours fériés:", error);
      }
    };
    fetchJoursFeries();
  }, []);  // Chargement uniquement au montage du composant

  useEffect(() => {
    if (!calendarEl.current) return;

    const calendarInstance = new Calendar(calendarEl.current, {
      plugins: [dayGridPlugin, listPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: 'fr',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listWeek myCustomButton',
      },
      buttonText: {
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
      },
      customButtons: {
        myCustomButton: {
          text: 'Ajouter événement',
          click: () => setIsModalOpen(true),
        }
      },
      events,
      editable: true,
      droppable: true,
      eventClick: (info) => {
        setSelectedEvent(info.event);
        setFormData({
          jour_ferie_id: info.event.extendedProps.jour_ferie_id,
          title: info.event.title,
          start: info.event.start ? info.event.start.toLocaleDateString('fr-CA') : '',
          end: info.event.end ? info.event.end.toLocaleDateString('fr-CA') : '',
        });
        setIsModalOpen(true);
      },
      eventDrop: async (info) => {
        await handleEventUpdate(info.event);
      },
      eventResize: async (info) => {
        await handleEventUpdate(info.event);
      }
    });

    calendarInstance.render();

    return () => calendarInstance.destroy();
  }, [events]);

  const handleAddEvent = async () => {
    if (formData.title && formData.start && formData.end) {
      try {
        const newEvent = await createJourFerie(formData);
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        alert("Jour férié ajouté avec succès");
      } catch (error) {
        console.error("Erreur d'ajout:", error);
        alert("Une erreur est survenue lors de l'ajout du jour férié");
      }

      setFormData({ jour_ferie_id: '', title: '', start: '', end: '' });
      setIsModalOpen(false);
    }
  };

  const handleEventUpdate = async (event) => {
    try {
      if (selectedEvent && formData.title && formData.start && formData.end) {
        await updateJourFerie(formData.jour_ferie_id, formData);
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event.jour_ferie_id === formData.jour_ferie_id ? formData : event))
        );
        alert("Jour férié mis à jour avec succès");
      }
      else {
        const updatedEvent = {
          jour_ferie_id: event.extendedProps.jour_ferie_id,
          title: event.title,
          start: event.start.toLocaleDateString('fr-CA'),
          end: event.end.toLocaleDateString('fr-CA'),
        };
        await updateJourFerie(updatedEvent.jour_ferie_id, updatedEvent);
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.jour_ferie_id === updatedEvent.jour_ferie_id ? updatedEvent : e))
        );
        alert("Jour férié mis à jour avec succès");
      }
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      alert("Une erreur est survenue lors de la mise à jour du jour férié");
    }

    setSelectedEvent(null);
    setFormData({ jour_ferie_id: '', title: '', start: '', end: '' });
    setIsModalOpen(false);
  };

  // Fonction pour supprimer un événement
  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        await deleteJourFerie(selectedEvent.extendedProps.jour_ferie_id); // Suppression du jour férié du backend
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.jour_ferie_id !== selectedEvent.extendedProps.jour_ferie_id)
        );
        alert("Jour férié supprimé avec succès");
      } catch (error) {
        console.error("Erreur de suppression:", error);
        alert("Une erreur est survenue lors de la suppression du jour férié");
      }

      setSelectedEvent(null);
      setFormData({ jour_ferie_id: '', title: '', start: '', end: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Header title="Jours fériés" icon={CalendarDaysIcon} parent="Paramètres" current="Jours fériés" />

      {isModalOpen && (
        <FormModal
          formLabel="Jour férié"
          header={true}
          action={selectedEvent ? "Mettre à jour" : "Ajouter"}
          onClose={() => setIsModalOpen(false)}
          onSubmit={selectedEvent ? handleEventUpdate : handleAddEvent}
          onDelete={handleDeleteEvent}
          formData={formData}
          setFormData={setFormData}
          fields={[
            { label: "Titre", key: "title", type: "text", value: formData.title },
            { label: "Date de début", key: "start", type: "date", value: formData.start },
            { label: "Date de fin", key: "end", type: "date", value: formData.end },
          ]}
        />
      )}

      <section className="mx-6 py-6">
        <div className="flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
              <div ref={calendarEl}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoursFeries;
