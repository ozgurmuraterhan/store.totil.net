import { FacebookIcon } from "@components/icons/facebook";
import { InstagramIcon } from "@components/icons/instagram";
import { TwitterIcon } from "@components/icons/twitter";
import { YouTubeIcon } from "@components/icons/youtube";
import { ROUTES } from "@utils/routes";
export const siteSettings = {
  name: "PickBazar",
  description: "",
  logo: {
    url: "/logo.svg",
    alt: "PickBazar",
    href: "/grocery",
    width: 128,
    height: 40,
  },
  defaultLanguage: "en",
  currencyCode: "USD",
  product: {
    placeholderImage: "/product-placeholder.svg",
    cardMaps: {
      grocery: "Krypton",
      furniture: "Radon",
      bag: "Oganesson",
      makeup: "Neon",
      book: "Xenon",
      medicine: "Helium",
      default: "Argon",
    },
  },
  author: {
    name: "RedQ, Inc.",
    websiteUrl: "https://redq.io",
    address: "115 E 9th St, New York, CA 90079,USA",
    phone: "+971-321-4841-78",
    social: [
      {
        link: "https://www.facebook.com",
        icon: <FacebookIcon width="16px" height="16px" />,
        hoverClass: "text-social-facebook",
      },
      {
        link: "https://www.instagram.com",
        icon: <InstagramIcon width="16px" height="16px" />,
        hoverClass: "text-social-instagram",
      },
      {
        link: "https://www.twitter.com",
        icon: <TwitterIcon width="16px" height="16px" />,
        hoverClass: "text-social-twitter",
      },
      {
        link: "https://www.youtube.com",
        icon: <YouTubeIcon width="16px" height="16px" />,
        hoverClass: "text-social-youtube",
      },
    ],
  },
  headerLinks: [
    { href: ROUTES.OFFERS, label: "Offers", icon: null },
    { href: ROUTES.HELP, label: "FAQ" },
    { href: ROUTES.CONTACT, label: "Contact" },
  ],
  authorizedLinks: [
    { href: ROUTES.PROFILE, label: "Profile" },
    { href: ROUTES.CHECKOUT, label: "Checkout" },
    { href: ROUTES.ORDERS, label: "My Orders" },
    { href: ROUTES.LOGOUT, label: "Logout" },
  ],
  dashboardSidebarMenu: [
    {
      href: ROUTES.PROFILE,
      label: "Profile",
    },
    {
      href: ROUTES.CHANGE_PASSWORD,
      label: "Change Password",
    },
    {
      href: ROUTES.ORDERS,
      label: "My Orders",
    },
    {
      href: ROUTES.HELP,
      label: "Need Help",
    },
    {
      href: ROUTES.LOGOUT,
      label: "Logout",
    },
  ],
  deliverySchedule: [
    {
      id: "1",
      title: "express-delivery",
      description: "90 min express delivery",
    },
    {
      id: "2",
      title: "8am-11am",
      description: "8.00 AM - 11.00 AM",
    },
    {
      id: "3",
      title: "11am-2pm",
      description: "11.00 AM - 2.00 PM",
    },
    {
      id: "4",
      title: "2pm-5pm",
      description: "2.00 PM - 5.00 PM",
    },
    {
      id: "5",
      title: "5pm-8pm",
      description: "5.00 PM - 8.00 PM",
    },
    {
      id: "6",
      title: "next day",
      description: "Next Day",
    },
  ],
};
