import { AllIcons } from "@/assets/Icons";
import { useState } from "react";

type ToggleButton = {
  icon: string;
};

export function ToggleButtonsComponent({
  buttons = [],
  initialActive = 0,
}: {
  buttons?: ToggleButton[];
  initialActive?: number;
}) {
  const [active, setActive] = useState(initialActive);

  const handleClick = (index: number) => {
    setActive(index);
  };

  return (
    <div>
      <div className="flex border rounded overflow-hidden">
        {buttons.map((btn, index) => {
          const Icon = AllIcons[btn.icon as keyof typeof AllIcons] || AllIcons.IconUser;
          const isActive = index === active;

          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`flex-1 p-3 flex items-center justify-center border-r last:border-r-0 ${isActive ? "bg-blue-100" : "bg-white"
                }`}
            >
              <Icon />
            </button>
          );
        })}
      </div>
    </div>
  );
}
