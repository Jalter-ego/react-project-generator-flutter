export function CircleAvatarComponent({
    image = "https://via.placeholder.com/150",
    size = 80,
    borderColor = "#ffffff",
}: {
    image?: string;
    size?: number;
    borderColor?: string;
}) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                overflow: "hidden",
                border: `2px solid ${borderColor}`, // ancho fijo
                boxShadow: "0 0 8px rgba(0,0,0,0.2)", // sombra siempre activa
            }}
        >
            <img
                src={image}
                alt="avatar"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </div>
    );
}
