import type { ComponentInstanceCard } from "../../types/CanvasItem";

export default function Card(props: any) {
    const { card }: { card: ComponentInstanceCard } = props;
    return (
        <article className="bg-zinc-200 w-32 rounded-lg px-3 py-1 shadow-md ">
            <img src={card.image} alt={card.title} className="w-full h-20 rounded-2xl" />
            <h2 className="text-[14px] font-semibold">{card.title}</h2>
            <p className="text-[12px]">{card.description}</p>
            <div className="px-2 py-0.5 bg-green-300 w-fit rounded-lg ">
                <p className="text-[10px] font-semibold ">Price: ${card.price}</p>
            </div>
        </article>
    )
}