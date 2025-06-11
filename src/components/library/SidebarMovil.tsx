import { AllIcons, IconMenuDeep, IconX } from "@/assets/Icons";
import type { ComponentInstanceSidebar } from "@/types/CanvasItem";
import { useState } from "react";

interface SidebarMovilProps {
    sidebar: ComponentInstanceSidebar;
    onClick?: () => void;
    navigateToScreen?: (screenId: string) => void;
}

export default function SidebarMovil({ sidebar, onClick,navigateToScreen }: SidebarMovilProps) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <div
                className="absolute -z-10 top-2 left-4" 
                onClick={() => setOpen(!open)}>
                <IconMenuDeep />
            </div>
            {open && (
                <aside className="bg-zinc-300 w-[260px] h-[610px]"
                    style={{
                        backgroundColor: sidebar.bg
                    }}>
                    <section className="flex justify-between px-4 pt-2 border-b border-zinc-400 pb-10">
                        <div className="mt-2">
                            <h1 className="text-lg font-semibold">{sidebar.title}</h1>
                            <h2 className="text-sm">{sidebar.subtitle}</h2>
                        </div>
                        <div
                            className="bg-zinc-500 rounded-lg p-0.5 h-fit text-white"
                            onClick={() => setOpen(!open)}
                        >
                            <IconX />
                        </div>
                    </section>
                    <section className="p-4">
                        {sidebar.items.map((item, index) => {
                            const IconComponent =
                                AllIcons[item.icon as keyof typeof AllIcons] || AllIcons.IconUser;
                            return (
                                <div
                                    className="py-2 hover:bg-zinc-400 transition-all rounded-2xl px-2 hover:font-semibold flex gap-2"
                                    key={index}
                                    onClick={() => {
                                        if (navigateToScreen && item.navigateTo) {
                                            navigateToScreen(item.navigateTo);
                                        }
                                        if (onClick) onClick();
                                    }}

                                >
                                    <IconComponent />
                                    <p className="">{item.item}</p>
                                </div>
                            );
                        })}
                    </section>
                </aside>
            )}
        </div>
    );
}
