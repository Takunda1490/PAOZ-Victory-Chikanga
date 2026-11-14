import Seo from "../layout/Seo";
import Services from "../sections/Services";

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Service Times | PAOZ Victory Tabernacle Chikanga"
        description="Service times at PAOZ Victory Tabernacle Chikanga, Mutare, Zimbabwe. Sunday 09:00-12:30, Monday and Wednesday 17:00-18:00. Stand No. 10B, World Bank Street, Chikanga 1."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Service Times", url: "/services" },
        ]}
      />
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
        Service Times
      </h1>
      <Services />
    </>
  );
}
