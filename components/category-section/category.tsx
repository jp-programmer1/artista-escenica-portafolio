"use client";

interface CategoryProps {
  id: string;
  activeCategory: string;
  name: string;
  setActiveCategory: (id: string) => void;
}
export const Category = ({
  id,
  name,
  activeCategory,
  setActiveCategory,
}: CategoryProps) => {
  return (
    <div>
      <button
        key={id}
        onClick={() => setActiveCategory(id)}
        className={`flex items-center mb-2 gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === id
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary"
        }`}
      >
        {name}
      </button>
    </div>
  );
};
