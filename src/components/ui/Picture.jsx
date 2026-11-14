// src/components/ui/Picture.jsx
//
// Renders an  through a <picture> element so the browser picks the
// smallest supported format (AVIF -> WebP -> JPEG fallback) for our local
// assets. Supabase Storage and external URLs are wrapped in <picture> with
// proper loading and dimension attributes so they don't cause layout shift.
// Local assets that lack a WebP/AVIF variant fall back to the JPEG/PNG source.
//
// Defaults to lazy loading so only images about to enter the viewport are
// fetched. Pass eager={true} (or loading="eager") for the LCP image.
//
// width and height props are accepted for all images to reserve space and
// prevent Cumulative Layout Shift (CLS).

import { useMemo } from "react";

const LOCAL_RE = /^\/assets\//i;

// Largest rendered width per context. Used to build responsive srcsets.
const SIZES = {
  // Full-viewport hero / big section backgrounds.
  hero: "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1600px",
  // Full-width content images (About, Message).
  wide: "(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1152px",
  // Card / pillar images.
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px",
  // Scripture slider images.
  slider: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px",
};

function isLocal(src) {
  return typeof src === "string" && LOCAL_RE.test(src);
}

function localVariants(src) {
  // /assets/foo.jpg  -> { jpg: "/assets/foo.jpg", webp: "/assets/foo.webp", avif: "/assets/foo.avif" }
  const base = src.replace(/\.(jpe?g|png|avif|webp)$/i, "");
  return {
    jpg: `${base}.jpg`,
    webp: `${base}.webp`,
    avif: `${base}.avif`,
  };
}

export default function Picture({
  src,
  alt,
  _sizes = "wide",
  className,
  style,
  loading = "lazy",
  eager = false,
  width,
  height,
  ...rest
}) {
  const local = useMemo(() => isLocal(src), [src]);
  const imgLoading = eager ? "eager" : loading;

  // Local assets: AVIF -> WebP -> JPEG fallback via <picture>.
  if (local) {
    const v = localVariants(src);
    return (
      <picture>
        <source srcSet={v.avif} type="image/avif" />
        <source srcSet={v.webp} type="image/webp" />
        <img
          src={v.jpg}
          alt={alt}
          loading={imgLoading}
          width={width}
          height={height}
          className={className}
          style={style}
          {...rest}
        />
      </picture>
    );
  }

  // Supabase Storage and external URLs: wrap in <picture> for consistency,
  // with width/height and loading attributes to prevent CLS.
  return (
    <picture>
      <img
        src={src}
        alt={alt}
        loading={imgLoading}
        width={width}
        height={height}
        className={className}
        style={style}
        {...rest}
      />
    </picture>
  );
}

export { SIZES };
