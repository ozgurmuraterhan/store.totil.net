export type BannerType = {
  heading: string;
  subheading: string;
  image: string;
};
export interface PageInfo {
  title: string;
  description: string;
  banner: BannerType;
}
export type PageName =
  | "grocery"
  | "bakery"
  | "makeup"
  | "bags"
  | "clothing"
  | "furniture";

export const sitePages: Record<PageName, PageInfo> = {
  grocery: {
    title: "Grocery - PickBazar",
    description: "Grocery Details",
    banner: {
      heading: "Groceries Delivered in 90 Minute",
      subheading:
        "Get your healthy foods & snacks delivered at your doorsteps all day everyday",
      image: "/banner/grocery.png",
    },
  },
  bakery: {
    title: "Bakery - PickBazar",
    description: "Bakery Details",
    banner: {
      heading: "Get Your Bakery Items Delivered",
      subheading:
        "Get your favorite bakery items baked and delivered to your doorsteps at any time",
      image: "/banner/bakery.jpg",
    },
  },
  makeup: {
    title: "Makeup - PickBazar",
    description: "Makeup Details",
    banner: {
      heading: "Branded & imported makeups",
      subheading:
        "Easiest and cheapest way to get your branded & imported makeups",
      image: "/banner/makeup.png",
    },
  },
  bags: {
    title: "Bags - PickBazar",
    description: "Bags Details",
    banner: {
      heading: "Exclusive Branded bags",
      subheading:
        "Get your exclusive & branded bags delivered to you in no time",
      image: "/banner/bags.png",
    },
  },
  clothing: {
    title: "Clothing - PickBazar",
    description: "Clothing Details",
    banner: {
      heading: "Shop your designer dresses",
      subheading:
        "Ready to wear dresses tailored for you from online. Hurry up while stock lasts.",
      image: "/banner/cloths.png",
    },
  },
  furniture: {
    title: "Furniture - PickBazar",
    description: "Furniture Details",
    banner: {
      heading: "Exclusive furniture on cheap price",
      subheading:
        "Make your house a home with our wide collection of beautiful furniture",
      image: "/banner/furniture.png",
    },
  },
};
