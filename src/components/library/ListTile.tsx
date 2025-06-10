import { AllIcons } from "@/assets/Icons";
import { Checkbox } from "@mui/material";

export function ListTileListComponent({
    list = [],
}: {
    list?: {
        icon: string;
        title: string;
        subtitle?: string;
        showCheckbox?: boolean;
        checked?: boolean;
    }[];
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {list.map((item, idx) => {
                const IconComponent = AllIcons[item.icon as keyof typeof AllIcons] || AllIcons.IconUser;

                return (
                    <div
                        key={idx}
                        className="flex items-center justify-between px-4 py-3 rounded-md shadow-sm"
                        style={{
                            color: "#333333",
                            border: "1px solid #ddd",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <IconComponent />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{item.title}</span>
                                {item.subtitle && (
                                    <span className="text-xs text-gray-600">{item.subtitle}</span>
                                )}
                            </div>
                        </div>
                        {item.showCheckbox && <Checkbox checked={item.checked} disabled />}
                    </div>
                );
            })}
        </div>
    );
}
