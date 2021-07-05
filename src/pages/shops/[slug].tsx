import Image from "next/image";
import ShopProductFeed from "@components/product/feed-shop";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "@utils/use-window-size";
import ShopProfileCard from "@components/profile/profile-card";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layout/layout";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

const ShopPage = () => {
  const { t } = useTranslation("common");
  const { width } = useWindowSize();
  const {
    query: { slug },
  } = useRouter();

  const { data, isLoading } = useShopQuery(slug as string);
  if (isLoading) return null;
  return (
    <div className="bg-gray-100 flex flex-col md:flex-row md:items-start md:p-8">
      <ShopProfileCard data={data} className="sticky top-24 lg:top-28" />

      <div className="flex flex-col w-full p-4 md:p-0 md:ps-8">
        <div className="relative rounded w-full min-h-140 overflow-hidden hidden md:flex">
          <Image
            alt={t("heading")}
            src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {data && <ShopProductFeed shopId={data.id} />}
      </div>
      {width > 1023 && <CartCounterButton />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
ShopPage.Layout = Layout;
export default ShopPage;
