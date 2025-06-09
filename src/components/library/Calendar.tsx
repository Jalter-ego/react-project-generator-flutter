import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

export default function CalendarComponent() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div
      style={{
        width: "290px",
        padding: "8px",
      }}
    >
      <Calendar
        value={date}
        onChange={(newDate) => setDate(newDate as Date)}
        className="custom-calendar"
        calendarType="gregory"
        showNavigation={true}
        
      />
    </div>
  );
}