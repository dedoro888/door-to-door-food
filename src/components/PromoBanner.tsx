import food1 from "@/assets/food-1.jpg";
import food3 from "@/assets/food-3.jpg";
import food6 from "@/assets/food-6.jpg";
import { useState } from "react";
import { Tag } from "lucide-react";

const promos = [
  { id: 1, headline: "50% Off", sub: "Your first order today", badge: "NEW USER", image: food1, color: "hsl(var(--primary))" },
  { id: 2, headline: "Free Delivery", sub: "On orders above ₦3,000", badge: "LIMITED", image: food3, color: "hsl(177 98% 19%)" },
  { id: 3, headline: "₦500 Off", sub: "Use code VENDOOR10", badge: "PROMO", image: food6, color: "hsl(38 95% 54%)" },
];

const PromoBanner = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="px-5 mt-4">
      <div className="relative rounded-3xl overflow-hidden h-36">
        {promos.map((p, i) => (
          <div
            key={p.id}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
          >
            <img src={p.image} alt={p.headline} className="absolute inset-0 w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(105deg, ${p.color} 0%, ${p.color}99 40%, transparent 75%)`,
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-center px-5">
              <div
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 w-fit"
                style={{ background: "white", color: p.color }}
              >
                <Tag className="w-2.5 h-2.5" />
                {p.badge}
              </div>
              <p className="text-3xl font-black text-white leading-tight">{p.headline}</p>
              <p className="text-white/80 text-sm mt-0.5">{p.sub}</p>
            </div>
          </div>
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {promos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? "20px" : "6px",
                background: i === active ? "white" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
