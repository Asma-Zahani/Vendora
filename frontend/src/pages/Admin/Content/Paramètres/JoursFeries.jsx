/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import Header from "../Header";
import { CalendarDaysIcon } from "lucide-react";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import FormModal from "@/components/Modals/FormModal";
import Dropdown from "@/components/ui/Dropdown";
import { getEntities, getEntityBy } from "@/service/EntitesService";
import { handleCreate, handleEdit, handleDelete } from "../EntityCRUD";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext";

const JoursFeries = () => {
  const calendarEl = useRef(null);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ jour_ferie_id: '', drive_id: '', title: '', start: '', end: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [errors, setErrors] = useState(null);
  const { setSuccessMessage } = useContext(SuccessMessageContext);

  const [drives, setDrives] = useState([]);
  const [selectedDriveId, setSelectedDriveId] = useState();

  const fetchData = async () => {
    setDrives(await getEntities("drives"));
  };  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!calendarEl.current || !selectedDriveId) return;

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
          drive_id: info.event.extendedProps.drive_id,
          title: info.event.title,
          start: info.event.start ? info.event.start.toLocaleDateString('fr-CA') : '',
          end: info.event.end ? info.event.end.toLocaleDateString('fr-CA') : '',
        });
        setIsModalOpen(true);
      },
      eventDrop: async (info) => {
        handleEventUpdate(info.event);
      },
      eventResize: async (info) => {
        handleEventUpdate(info.event);
      }
    });

    calendarInstance.render();

    return () => calendarInstance.destroy();
  }, [events, selectedDriveId]);

  const handleEventUpdate = async (event) => {
    let updatedData = null;

    if (event && event.extendedProps && event.extendedProps.jour_ferie_id) {
      updatedData = {
        jour_ferie_id: event.extendedProps.jour_ferie_id,
        drive_id: event.extendedProps.drive_id,
        title: event.title,
        start: event.start.toLocaleDateString('fr-CA'),
        end: event.end.toLocaleDateString('fr-CA'),
      };
    }
    const dataToUpdate = updatedData ? updatedData : formData;

    const isValid = await handleEdit("joursFeries", "jour_ferie_id", dataToUpdate, setErrors, setSuccessMessage);
    
    if(isValid) {
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.jour_ferie_id === dataToUpdate.jour_ferie_id ? dataToUpdate : event))
      );
  
      setSelectedEvent(null);
      setFormData({ jour_ferie_id: '', drive_id: selectedDriveId, title: '', start: '', end: '' });
      setIsModalOpen(false);
    }
  };

  const handleAddEvent = async () => {
    const isValid = await handleCreate("joursFeries", formData, setErrors, setSuccessMessage);
    if(isValid) {
      setEvents((prevEvents) => [...prevEvents, formData ]);
    
      setFormData({ jour_ferie_id: '', drive_id: selectedDriveId, title: '', start: '', end: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteEvent = async () => {
    console.log(formData);
    handleDelete("joursFeries", formData.jour_ferie_id, setSuccessMessage);
    
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.jour_ferie_id !== formData.jour_ferie_id)
    );
    setFormData({ jour_ferie_id: '', drive_id: selectedDriveId, title: '', start: '', end: '' });
    setIsModalOpen(false);
  };

  return (
    <>
      <Header title="Jours fériés" icon={CalendarDaysIcon} parent="Paramètres" current="Jours fériés" />
      <section className="mx-6 py-6">
        <div className="flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
              <div className="sm:flex items-center justify-between mt-2 mb-2">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Jours fériés
                </h2> 
              </div>
              <Dropdown label={"drive"} name={"drive_id"} options={drives.map(drive => ({ value: drive.drive_id, label: drive.nom }))} selectedValue={selectedDriveId} isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)}
                onSelect={async (selected) => {                  
                  setSelectedDriveId(selected.value);
                  setEvents(await getEntityBy("joursFeries", "drive", selected.value));
                  setFormData((prev) => ({ ...prev, drive_id: selected.value }));
                  setIsOpen(false);
                }}
              />
              {!selectedDriveId ? <></> : 
                <div className="mt-4">
                  <div ref={calendarEl}></div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <FormModal formLabel="Jour férié" action={selectedEvent ? "Mettre à jour" : "Ajouter"}
          onClose={() => setIsModalOpen(false)} 
          onSubmit={selectedEvent ? handleEventUpdate : handleAddEvent}
          formData={formData} setFormData={setFormData} errors={errors}
          {...(selectedEvent && { onDelete: handleDeleteEvent })}
          fields={[
            { label: "Titre", key: "title", type: "text", value: formData.title },
            { label: "Date de début", key: "start", type: "date", value: formData.start },
            { label: "Date de fin", key: "end", type: "date", value: formData.end },
          ]}
        />
      )}
    </>
  );
};

export default JoursFeries;