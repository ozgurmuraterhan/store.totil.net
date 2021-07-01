import Layout from "@components/layout/layout";
import { termsAndServices } from "@settings/terms.settings";
import { Link, Element } from "react-scroll";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function TermsPage() {
  const { title, date, content } = termsAndServices;

  return (
    <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
        <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-gray-800 font-bold mb-4 sm:mb-5 2xl:mb-7">
          {title}
        </h1>
        <p className="text-sm md:text-base text-gray-600 2xl:text-lg px-0.5">
          {date}
        </p>
      </header>
      {/* End of page header */}

      <div className="flex flex-col md:flex-row">
        <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
          <ol className="sticky md:top-16 lg:top-22 bg-gray-100 z-10">
            {content?.map((item) => (
              <li key={item.title}>
                <Link
                  spy={true}
                  offset={-120}
                  smooth={true}
                  duration={500}
                  to={makeTitleToDOMId(item.title)}
                  activeClass="text-sm lg:text-base text-heading font-semibold"
                  className="cursor-pointer inline-flex py-3 text-gray-700 uppercase"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {/* End of section scroll spy menu */}

        <div className="md:w-9/12 md:pl-8 md:pb-96">
          {content?.map((item) => (
            <Element
              key={item.title}
              name={makeTitleToDOMId(item.title)}
              className="mb-10"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl text-gray-800 font-bold mb-4">
                {item.title}
              </h2>
              <div
                className="text-gray-600 leading-loose"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </Element>
          ))}
        </div>
        {/* End of content */}
      </div>
    </section>
  );
}

TermsPage.Layout = Layout;
