import { HandHeart, MessageCircle } from "lucide-react";
import { useSite } from "../../context/SiteContext";

export default function Giving() {
  const { giving: copy, giving_methods: methods = [] } = useSite();

  return (
    <section id="giving" className="py-20 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="giving-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40L40 0H20L0 20M40 40V20L20 40"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#giving-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="text-primary-300 font-bold tracking-wider uppercase text-sm">
            {copy.eyebrow}
          </span>
          <h2 className="mt-2 text-4xl font-serif font-bold text-white mb-4">
            {copy.heading}
          </h2>
          <p className="text-gray-300">{copy.body}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {methods.map((method, i) => (
            <div
              key={method.id ?? i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center mb-4">
                <HandHeart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {method.label}
              </h3>
              <p className="text-primary-100 font-medium mb-2 break-words">
                {method.value}
              </p>
              {method.note && (
                <p className="text-gray-300 text-sm flex-1">{method.note}</p>
              )}
              {method.label?.toLowerCase().includes("whatsapp") && (
                <a
                  href={method.value.startsWith("http") ? method.value : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-primary-300 mt-4"
                >
                  <MessageCircle className="w-4 h-4" /> Chat with us
                </a>
              )}
            </div>
          ))}
        </div>

        {copy.footnote && (
          <p className="mt-10 text-center text-primary-200/80 text-sm max-w-2xl mx-auto">
            {copy.footnote}
          </p>
        )}
      </div>
    </section>
  );
}