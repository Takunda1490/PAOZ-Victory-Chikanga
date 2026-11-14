import Seo from "../layout/Seo";
import Giving from "../sections/Giving";

export default function GivingPage() {
  return (
    <>
      <Seo
        title="Giving & Donations | PAOZ Victory Tabernacle Chikanga"
        description="Give online to PAOZ Victory Tabernacle Chikanga, Mutare, Zimbabwe. Bank transfer, EcoCash and WhatsApp details. Support the ministry."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Giving & Donations", url: "/giving" },
        ]}
      />
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
        Giving & Donations
      </h1>
      <Giving />
    </>
  );
}
