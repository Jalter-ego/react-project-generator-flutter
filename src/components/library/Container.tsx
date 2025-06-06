export default function Container(
    {bg, width, height, borderRadius}: {
        bg?: string;
        width?: number;
        height?: number;
        borderRadius?: number;
    }
){
    return(
        <div
            className="flex flex-col items-center justify-center"
            style={{
                backgroundColor: bg || '#ffffff',
                width: width || 300,
                height: height || 200,
                borderRadius: borderRadius || 12,
            }}
        >
        </div>
    )
}