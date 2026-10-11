import { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/MenuContext.jsx';

export default function PromoBanner() {
  const { storeInfo } = useStore();
  const banners = Array.isArray(storeInfo?.banners) ? storeInfo.banners : [];
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return undefined;

    const handleScroll = () => {
      const nextIndex = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(nextIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const goToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const max = Math.max(0, banners.length - 1);
    const safeIndex = Math.min(Math.max(index, 0), max);
    container.scrollTo({ left: container.clientWidth * safeIndex, behavior: 'smooth' });
    setActiveIndex(safeIndex);
  };

  if (!banners.length) return null;

  return (
    <section className="promo-banner-wrap" aria-label="Banners promocionais">
      <div className="promo-banner" ref={scrollRef}>
        {banners.map((banner) => (
          <button
            key={`${banner.title}-${banner.image}`}
            type="button"
            className="promo-slide"
            onClick={() => {
              if (!banner.targetCategoryId) return;
              document.getElementById(banner.targetCategoryId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <img src={banner.image} alt={banner.title} />
            <div className="promo-content">
              <span>{banner.title}</span>
              <strong>{banner.ctaLabel}</strong>
            </div>
          </button>
        ))}
      </div>

      <div className="promo-dots" aria-label="Indicadores de banner">
        {banners.map((banner, index) => (
          <button
            key={`${banner.title}-dot`}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            aria-label={`Ir para o banner ${index + 1}`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
