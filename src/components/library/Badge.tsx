type BadgeProps = {
  label?: string;
  bg?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  text?: string;
  children?: React.ReactNode;
};

export function BadgeComponent({
  label = "1",
  bg = "#ff3b30",
  position = "top-right",
  text = "",
  children,
}: BadgeProps) {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <div className="relative inline-block">
      {/* Si hay children, los renderizamos, sino mostramos el contenedor por defecto */}
      {children ? (
        children
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          {text && (
            <span className="text-black font-bold text-2xl leading-none select-none">
              {text}
            </span>
          )}
        </div>
      )}
      
      {/* Badge que se superpondrá */}
      <span
        className={`absolute ${positionClasses[position]} translate-x-1/2 -translate-y-1/2
        px-2 py-0.5 rounded-full text-xs font-bold z-10`}
        style={{
          backgroundColor: bg,
          color: "#fff",
          minWidth: "1.25rem", // Para mantener consistencia con badges pequeños
          minHeight: "1.25rem", // Para mantener forma circular con poco contenido
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}