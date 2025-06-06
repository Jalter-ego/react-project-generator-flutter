
type ImageProps = {
    image?: string;
    width?: number;
    height?: number;
    borderRadius?: number;
};

export default function ImageComponent(props: ImageProps) {
    const {
        image = "https://via.placeholder.com/150",
        width = 120,
        height = 120,
        borderRadius = 12,
    } = props;

    return (
        <img
            src={image}
            alt="image"
            style={{
                width,
                height,
                borderRadius,
                objectFit: "cover",
            }}
        />
    );
}
