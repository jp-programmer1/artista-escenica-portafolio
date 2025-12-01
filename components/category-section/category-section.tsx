"use client";

import { Category } from "@/types/categories.type";
import { Category as CategoryComponent } from "./category";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle } from "lucide-react";

export const CategorySection = ({
  categories,
  activeCategory,
  isChild,
  handleCategoryClick,
  goBack,
  history,
}: {
  categories: Category[];
  activeCategory: string;
  isChild?: boolean;
  history: boolean;
  handleCategoryClick: (id: string, removeCategory?: boolean) => void;
  goBack: () => void;
}) => {
  return (
    <>
      <div
        className={cn(
          "flex flex-wrap items-center gap-5 mx-5",
          isChild && "bg-red-500"
        )}
      >
        {history && (
          <div className="flex justify-center gap-3 mb-3">
            <ArrowLeftCircle onClick={goBack} />
          </div>
        )}

        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <CategoryComponent
                key={category.id}
                id={category.id}
                activeCategory={activeCategory}
                name={category.name}
                setActiveCategory={(id) => {
                  handleCategoryClick(id, true);
                }}
              />
            );
          })}
      </div>
      <div id="portal-tabs"></div>
    </>
  );
};
