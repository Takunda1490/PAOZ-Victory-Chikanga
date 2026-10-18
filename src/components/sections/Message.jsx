import Picture from "../ui/Picture";
import { useSite } from "../../context/SiteContext";

export default function Message() {
  const { message } = useSite();

  return (
    <section id="message" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
<Picture
                src={message.image}
                alt="Open Bible"
                sizes="wide"
                className="rounded-lg shadow-xl w-full object-cover h-[420px]"
              />
          </div>
          <div>
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">
              {message.eyebrow}
            </span>
            <h2 className="mt-2 text-4xl font-serif font-bold text-gray-900 mb-3">
              {message.title}
            </h2>
            <p className="text-primary-700 italic font-medium mb-6">
              {message.scripture}
            </p>
            <p className="text-gray-600 leading-relaxed">{message.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}