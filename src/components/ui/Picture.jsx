// src/components/Picture.jsx
//
// Renders an <img> through a <picture> element so the browser picks the
// smallest supported format (AVIF -> WebP -> JPEG fallback) for our local
// assets. URLs that are NOT local (e.g. Supabase storage paths, external
// images) are passed straight through as a plain <img>.
//
// Defaults to lazy loading so only images about to enter the viewport are
// fetched. Pass eager={true} (or loading="eager") for the LCP image.

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
  ...rest
}) {
  const local = useMemo(() => isLocal(src), [src]);

  if (!local) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  const v = localVariants(src);

  return (
    <picture>
      <source srcSet={v.avif} type="image/avif" />
      <source srcSet={v.webp} type="image/webp" />
      <img
        src={v.jpg}
        alt={alt}
        loading={eager ? "eager" : loading}
        className={className}
        style={style}
        {...rest}
      />
    </picture>
  );
}

export { SIZES };