import { categories } from "@/data/mockData";

interface CategoryFilterProps {
  active: string;
  onSelect: (id: string) => void;
}

const CategoryFilter = ({ active, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 px-5 overflow-x-auto hide-scrollbar py-3 mt-1">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200"
          style={
            active === cat.id
              ? { background: "hsl(var(--primary))", color: "white", boxShadow: "0 4px 12px hsl(var(--primary) / 0.35)" }
              : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }
          }
        >
          <span className="text-base leading-none">{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
