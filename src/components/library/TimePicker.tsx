import { useState } from "react";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export default function TimePickerComponent() {
    const [value, setValue] = useState<string | null>("10:00");

    return (
        <div style={{ width: "120px", padding: "8px" }}>
            <TimePicker
                onChange={setValue}
                value={value}
                clockIcon={null}
                clearIcon={null}
                disableClock={true}
            />
        </div>
    );
}
