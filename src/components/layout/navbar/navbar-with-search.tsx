import { useRef } from "react";
import Link from "@components/ui/link";
import cn from "classnames";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import Search from "@components/common/search";
import JoinButton from "@components/layout/navbar/join-button";
import ProductTypeMenu from "@components/layout/navbar/product-type-menu";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const NavbarWithSearch = () => {
  const navbarRef = useRef() as DivElementRef;
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();
  addActiveScroll(navbarRef);

  return (
    <header
      ref={navbarRef}
      className="site-header-with-search h-14 md:h-16 lg:h-auto"
    >
      <nav
        className={cn(
          "w-full h-14 md:h-16 lg:h-22 py-5 px-4 lg:px-8 flex justify-between items-center  top-0 right-0 z-20 transition-transform duration-300",
          {
            "fixed bg-white lg:bg-transparent lg:absolute": !displayHeaderSearch,
            "is-sticky fixed bg-white shadow-sm": displayHeaderSearch,
          }
        )}
      >
        {displayMobileSearch ? (
          <div className="w-full">
            <Search label="grocery search at header" variant="minimal" />
          </div>
        ) : (
          <>
            <Logo className="mx-auto lg:mx-0" />
            <ProductTypeMenu className="ml-10 mr-auto hidden xl:block" />
            <div className="hidden lg:block w-full">
              <div
                className={cn(
                  "w-full xl:w-11/12 2xl:w-10/12 mx-auto px-10 overflow-hidden",
                  {
                    hidden: !displayHeaderSearch,
                    flex: displayHeaderSearch,
                  }
                )}
              >
                <Search label="grocery search at header" variant="minimal" />
              </div>
            </div>
            <ul className="hidden lg:flex items-center flex-shrink-0 space-x-10">
              {isAuthorize ? (
                <li key="track-orders">
                  <Link
                    href={ROUTES.ORDERS}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-primary focus:text-primary"
                  >
                    Track Order
                  </Link>
                </li>
              ) : null}
              {siteSettings.headerLinks.map(({ href, label, icon }) => (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-primary focus:text-primary"
                  >
                    {icon && <span className="mr-2">{icon}</span>}
                    {label}
                  </Link>
                </li>
              ))}
              {isAuthorize ? (
                <li>
                  <AuthorizedMenu />
                </li>
              ) : (
                <li>
                  <JoinButton />
                </li>
              )}
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavbarWithSearch;
