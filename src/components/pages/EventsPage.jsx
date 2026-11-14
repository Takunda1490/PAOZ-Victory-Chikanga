import Seo from "../layout/Seo";
import Events from "../sections/Events";

export default function EventsPage() {
  return (
    <>
      <Seo
        title="Upcoming Events | PAOZ Victory Tabernacle Chikanga"
        description="Upcoming events at PAOZ Victory Tabernacle Chikanga, Mutare, Zimbabwe. Light Up For Christ and other church events. Stand No. 10B, World Bank Street, Chikanga 1."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Upcoming Events", url: "/events" },
        ]}
      />
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
        Upcoming Events
      </h1>
      <Events />
    </>
  );
}
