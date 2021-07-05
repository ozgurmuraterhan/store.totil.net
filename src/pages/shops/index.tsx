import ShopCard from "@components/ui/shop-card";
import { useShopsQuery } from "@data/shop/use-shops.query";
import ShopPageLayout from "@components/layout/shop-layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Fragment } from "react";
import Spinner from "@components/ui/loaders/spinner/spinner";
import ErrorMessage from "@components/ui/error-message";

const ShopsPage = () => {
  const { data, isLoading, error } = useShopsQuery({
    is_active: 1,
  });
  const { t } = useTranslation("common");

  if (isLoading) return <Spinner showText={false} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="bg-light min-h-screen ">
      <div className="w-full max-w-6xl mx-auto flex flex-col p-8 pt-32 md:pt-40">
        <div className="pt-12">
          <h3 className="text-2xl text-heading font-bold mb-8">
            {t("text-all-shops")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.pages?.map((page, idx) => {
              return (
                <Fragment key={idx}>
                  {page.data.map((shop) => (
                    <ShopCard shop={shop} key={shop.id} />
                  ))}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

ShopsPage.Layout = ShopPageLayout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default ShopsPage;
