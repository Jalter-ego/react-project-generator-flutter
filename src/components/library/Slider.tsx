import { Slider } from "@mui/material";

type Props = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
};

export function SliderComponent({
    value = 40,
    min = 0,
    max = 100,
    step = 10,
    color = "#2196F3",
}: Props) {
    const generateMarks = () => {
        const marks = [];
        for (let i = min; i <= max; i += step) {
            marks.push({ value: i, label: `${i}` });
        }
        return marks;
    };

    return (
        <div style={{ width: 200 }}>
            <Slider
                defaultValue={value}
                min={min}
                max={max}
                step={step}
                marks={generateMarks()}
                valueLabelDisplay="auto"
                sx={{
                    color,
                    "& .MuiSlider-markLabel": {
                        fontSize: "12px",
                        marginTop: "8px",
                        color: "#333",
                    },
                }}
            />
        </div>
    );
}
