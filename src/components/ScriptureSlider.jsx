import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function ScriptureSlider() {
  const { scriptures: copy, scriptures: slides = [] } = useSite();

  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (!slides.length) return null;

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">
              {copy.eyebrow}
            </span>
            <h2 className="mt-2 text-4xl font-serif font-bold text-gray-900">
              {copy.heading}
            </h2>
          </div>
          {slides.length > 1 && (
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <button
                onClick={scrollPrev}
                aria-label="Previous scripture"
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-600 hover:border-primary-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next scripture"
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-600 hover:border-primary-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, i) => (
              <div
                key={slide.id ?? i}
                className="min-w-0 shrink-0 grow-0 basis-full grid md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="relative h-64 sm:h-80 md:h-[420px] bg-primary-900 flex items-center justify-center p-4">
                  <img
                    src={slide.image_url}
                    alt={`${slide.reference} — ${slide.title}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-xl"
                  />
                </div>

                <div className="px-6 sm:px-10 pb-10 md:pb-0 md:pr-12">
                  <span className="inline-block bg-primary-100 text-primary-800 font-semibold uppercase tracking-wider text-xs px-3 py-1 rounded-full mb-5">
                    {slide.reference}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                    {slide.title}
                  </h3>
                  <div className="relative pl-6 border-l-4 border-primary-500 mb-5">
                    <Quote className="w-5 h-5 text-primary-400 absolute -top-1 -left-0 translate-x-[-140%] bg-gray-50" />
                    <p className="font-serif italic text-lg sm:text-xl text-gray-700 leading-relaxed">
                      {slide.verse}
                    </p>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{slide.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="flex gap-2 mt-8 justify-center">
            {Array.from({ length: snapCount }, (_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to scripture ${i + 1}`}
                aria-current={selected === i}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  selected === i ? "w-10 bg-primary-600" : "w-2.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}