export default function Label(props: any) {
    const {
        label = "Etiqueta",
        fontSize = 14,
        bg = "#ffffff",
        width = 100,
        height = 30,
    } = props;

    return (
        <div
            className="flex items-center justify-center rounded-md"
            style={{
                backgroundColor: bg,
                width,
                height,
                fontSize,
            }}
        >
            {label}
        </div>
    );
}
