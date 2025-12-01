"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Play, ImageIcon, Video } from "lucide-react";
import { Category, Items, MediaType } from "@/types/categories.type";
import { CategorySection } from "./category-section/category-section";

const HOME_FOLDER_ID = import.meta.env.PUBLIC_HOME_FOLDER_ID;

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Items | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeMediaType, setActiveMediaType] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [history, setHistory] = useState<Category[][]>([]);
  const [mediaTypes, setMediaTypes] = useState<MediaType[]>([]);
  const [mediaItems, setMediaItems] = useState<Items[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/drive/${HOME_FOLDER_ID}`);
      const files = await res.json();
      if (files.length > 0) {
        setMediaTypes(files);
        setActiveMediaType(files[0].id);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/drive/${activeMediaType}`);
      const files = await res.json();
      if (files.length > 0) {
        const folders = files.filter(
          (file: Category) =>
            file.mimeType === "application/vnd.google-apps.folder"
        );
        const images = files.filter((file: Category) =>
          file.mimeType.startsWith("image/")
        );
        if (folders.length > 0) {
          setCategories(folders);
          setMediaItems([]);
        }
        if (images.length > 0) {
          setMediaItems(images);
          setCategories([]);
        }
      }
    };
    if (activeMediaType) load();
  }, [activeMediaType]);

  const handleCategoryClick = async (id: string, removeCategory?: boolean) => {
    setActiveCategory(id);
    const res = await fetch(`/api/drive/${id}`);
    const files = await res.json();
    if (files && files.length > 0) {
      console.log(files);

      const folders = files.filter(
        (file: Category) =>
          file.mimeType === "application/vnd.google-apps.folder"
      );
      const media = files.filter(
        (file: Category) =>
          file.mimeType.startsWith("image/") ||
          file.mimeType.startsWith("video/")
      );

      if (folders.length > 0) {
        if (removeCategory) {
          setHistory((current) => {
            const copyCurrent = [...current];
            copyCurrent.push(categories);
            return copyCurrent;
          });
          setCategories(folders);
        } else {
          setCategories(folders);
        }
        setMediaItems([]);
      }
      if (media.length > 0) {
        setMediaItems(media);
      }
    }
  };


  const goBack = useCallback(() => {
    if (history.length === 0) return;
    setCategories(history[history.length - 1]);
    setMediaItems([]);
    setHistory((current) => {
      const copyCurrent = [...current];
      copyCurrent.pop();
      return copyCurrent;
    });
  }, [history]);

  return (
    <section
      id="material"
      ref={sectionRef}
      className="relative z-20 py-32 px-6 bg-card/50"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Material
          </h2>
        </div>

        {/* Media Type Filter */}
        <div className="flex justify-center gap-3 mb-3">
          {mediaTypes.map((type) => {
            return (
              <button
                key={type.id}
                onClick={() => setActiveMediaType(type.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeMediaType === type.id
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/20 hover:text-accent"
                }`}
              >
                <span className="uppercase">{type.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Filter */}
        <CategorySection
          categories={categories}
          handleCategoryClick={handleCategoryClick}
          activeCategory={activeCategory || ""}
          isChild={false}
          goBack={goBack}
          history={Boolean(history.length > 0)}
        />

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item: Items, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div
                className={`${
                  item.mimeType.startsWith("video/")
                    ? "aspect-video"
                    : "aspect-[4/5]"
                } bg-muted rounded-lg overflow-hidden`}
              >
                {item.mimeType.startsWith("image/") ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.thumbnailLink || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (!target.src.endsWith("/placeholder.svg"))
                          target.src = "/placeholder.svg";
                      }}
                    />
                    <img
                      src={`/api/drive/file/${item.id}`}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      loading="lazy"
                      onLoad={(e) => {
                        e.currentTarget.classList.remove("opacity-0");
                      }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        // If high-res fails, keep showing the thumbnail; hide broken high-res
                        target.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={"/movie.jpg"}
                    className="absolute blur-xl inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  {item.mimeType.startsWith("video/") && (
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center mb-3 mx-auto">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  )}
                  <p className="text-foreground text-lg">
                    {item.mimeType.startsWith("video/") ? "" : "Ver imagen"}
                  </p>
                </div>
              </div>

              {/* Type indicator badge */}
              <div
                className={`absolute top-3 left-3 px-3 py-1 text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5 ${
                  item.mimeType.startsWith("video/")
                    ? "bg-accent/90 text-accent-foreground"
                    : "bg-primary/90 text-primary-foreground"
                }`}
              >
                {item.mimeType.startsWith("video/") ? (
                  <Video size={12} />
                ) : (
                  <ImageIcon size={12} />
                )}
                {item.mimeType.startsWith("video/") ? "Video" : "Foto"}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {mediaItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No hay contenido con estos filtros
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedItem(null)}
            aria-label="Cerrar"
          >
            <X size={32} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.mimeType.startsWith("video/") ? (
              <div className="space-y-4">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <video
                    src={`/api/drive/file/${selectedItem.id}`}
                    poster={selectedItem.thumbnailLink || "/placeholder.svg"}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    controls
                  />
                </div>
              </div>
            ) : (
              <img
                src={`/api/drive/file/${selectedItem.id}`}
                alt={selectedItem.name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto"
                loading="lazy"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
