import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found | PAOZ Victory Tabernacle Chikanga";
    let tag = document.head.querySelector('meta[name="robots"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex, nofollow");
  }, []);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-serif font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-6">This page doesn't exist.</p>
      <a href="/" className="text-primary-600 font-semibold hover:underline">
        Go home
      </a>
    </main>
  );
}
