import Seo from "../layout/Seo";
import VisitUs from "../sections/VisitUs";

export default function VisitUsPage() {
  return (
    <>
      <Seo
        title="Visit Us | PAOZ Victory Tabernacle Chikanga"
        description="Visit PAOZ Victory Tabernacle Chikanga in Mutare, Zimbabwe. Stand No. 10B, World Bank Street, Chikanga 1. Get directions and service times."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Visit Us", url: "/visit-us" },
        ]}
      />
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
        Visit Us
      </h1>
      <VisitUs />
    </>
  );
}
