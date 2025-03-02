import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importer le style

const holidayList = [
  "2025-01-01",
  "2025-05-01",
  "2025-07-14",
  "2025-12-25",
];

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fonction pour vérifier si une date est un jour férié
  const isHoliday = (date) => {
    return holidayList.includes(date.toISOString().split("T")[0]);
  };

  return (
    <div className="w-full h-full">
      <h2>Gestion des Jours Fériés</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) => (isHoliday(date) ? "holiday" : "")}
      />
      <p>
        📅 Date sélectionnée : <strong>{selectedDate.toDateString()}</strong>
      </p>
      {isHoliday(selectedDate) && <p style={{ color: "red" }}>🚨 C&apos;est un jour férié !</p>}
    </div>
  );
};

export default MyCalendar;
