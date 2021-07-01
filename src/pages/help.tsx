import Layout from "@components/layout/layout";
import Accordion from "@components/ui/accordion";
import { faq } from "@settings/faq.settings";

export default function HelpPage() {
  return (
    <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="text-center mb-8">
        <h1 className="font-bold text-xl md:text-2xl xl:text-3xl">F.A.Q</h1>
      </header>
      <div className="max-w-screen-lg w-full mx-auto">
        <Accordion items={faq} />
      </div>
    </section>
  );
}

HelpPage.Layout = Layout;
