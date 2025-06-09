export function ChipComponent({
    label = 'Input Chips',
    bg = '#6366F1',
    color = '#ffffff',
    icon = 'I',
}: {
    label?: string;
    bg?: string;
    color?: string;
    icon?: string;
}) {
    return (
        <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow text-sm"
            style={{
                backgroundColor: bg,
                color: color,
            }}
        >
            <div
                className="w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
                {icon}
            </div>
            <span className="whitespace-nowrap">{label}</span>
        </div>
    );
}
