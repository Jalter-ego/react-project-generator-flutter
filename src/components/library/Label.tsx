export default function Label(props: any) {
    const {
        label = "Etiqueta",
        colorFont = "#000000",
        fontSize = 14,
    } = props;

    return (
        <p
            className="flex items-center justify-center rounded-md"
            style={{
                fontSize,
                color: colorFont,
            }}
        >
            {label}
        </p>
    );
}
