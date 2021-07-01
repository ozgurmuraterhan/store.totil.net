import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "@components/ui/link";
import Layout from "@components/layout/layout";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import { formatString } from "@utils/format-string";
import { parseContextCookie } from "@utils/parse-cookie";
import { useCheckout } from "@contexts/checkout.context";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useOrderQuery } from "@data/order/use-order.query";
import { ROUTES } from "@utils/routes";
import { useSearch } from "@contexts/search.context";
import { useCart } from "@contexts/quick-cart/cart.context";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {},
  };
};

export default function OrderReceived() {
  const { query } = useRouter();
  const { resetCart } = useCart();
  const { clearCheckoutData } = useCheckout();
  const { updateSearchTerm } = useSearch();

  useEffect(() => {
    resetCart();
    clearCheckoutData();
    updateSearchTerm("");
  }, []);

  const { data, isLoading: loading } = useOrderQuery({
    tracking_number: query.tracking_number as string,
  });

  const { price: total } = usePrice(data && { amount: data.order.paid_total });
  const { price: sub_total } = usePrice(data && { amount: data.order.amount });
  const { price: shipping_charge } = usePrice(
    data && { amount: data?.order?.delivery_fee ?? 0 }
  );
  const { price: tax } = usePrice(
    data && { amount: data?.order?.sales_tax ?? 0 }
  );
  const { price: discount } = usePrice(
    data && { amount: data?.order?.discount ?? 0 }
  );

  if (loading) {
    return <Spinner showText={false} />;
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="p-6 sm:p-8 lg:p-12 max-w-screen-lg w-full mx-auto bg-white rounded border shadow-sm">
        <h2 className="flex items-center justify-between text-xl font-bold text-gray-800 mb-4 sm:mb-5">
          <span>Order Received</span>
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center text-primary text-base font-normal underline hover:no-underline hover:text-primary-2"
          >
            Back to Home
          </Link>
        </h2>
        <p className="leading-relaxed text-gray-600 mb-8 sm:mb-10">
          Thank you. Your order has been received
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="py-4 px-5 border border-gray-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm text-gray-800 font-semibold">
              Order Number
            </h3>
            <p className="text-sm  text-gray-600">
              {data?.order?.tracking_number}
            </p>
          </div>
          <div className="py-4 px-5 border border-gray-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-gray-800 font-semibold">Date</h3>
            <p className="text-sm text-gray-600">
              {dayjs(data?.order?.created_at).format("MMMM D, YYYY")}
            </p>
          </div>
          <div className="py-4 px-5 border border-gray-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-gray-800 font-semibold">Total</h3>
            <p className="text-sm  text-gray-600">{total}</p>
          </div>
          <div className="py-4 px-5 border border-gray-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-gray-800 font-semibold">
              Payment Method
            </h3>
            <p className="text-sm text-gray-600">
              {data?.order?.payment_gateway}
            </p>
          </div>
        </div>
        {/* end of order received  */}

        <h2 className="text-xl font-bold text-gray-800 mb-6">Order Details</h2>
        <div className="mb-12">
          <p className="flex text-gray-600 mt-5">
            <strong className="w-3/12 text-sm  text-gray-800 font-semibold">
              Total Item
            </strong>
            :
            <span className="w-9/12 pl-4 text-sm ">
              {formatString(data?.order?.products?.length, "Item")}
            </span>
          </p>
          <p className="flex text-gray-600 mt-5">
            <strong className="w-3/12 text-sm  text-gray-800 font-semibold">
              Delivery Time
            </strong>
            :
            <span className="w-9/12 pl-4 text-sm ">
              {data?.order?.delivery_time}
            </span>
          </p>
          <p className="flex text-gray-600 mt-5">
            <strong className="w-3/12 text-sm text-gray-800 font-semibold">
              Shipping Address
            </strong>
            :
            <span className="w-9/12 pl-4 text-sm ">
              {formatAddress(data?.order?.shipping_address!)}
            </span>
          </p>
        </div>
        {/* end of order details */}

        <h2 className="text-xl font-bold text-gray-800 mb-6">Total Amount</h2>
        <div>
          <p className="flex text-gray-600 mt-5">
            <strong className="w-3/12 text-sm  text-gray-800 font-semibold">
              Sub Total
            </strong>
            :<span className="w-9/12 pl-4 text-sm ">{sub_total}</span>
          </p>
          <p className="flex text-gray-600 mt-5">
            <strong className="w-3/12 text-sm  text-gray-800 font-semibold">
              Shipping Charge
            </strong>
            :<span className="w-9/12 pl-4 text-sm ">{shipping_charge}</span>
          </p>
          <p className="flex text-gray-600 mt-5">
            <strong className="w-3/12 text-sm  text-gray-800 font-semibold">
              Tax
            </strong>
            :<span className="w-9/12 pl-4 text-sm ">{tax}</span>
          </p>
          <p className="flex text-gray-600 mt-5">
            <strong className="w-3/12 text-sm  text-gray-800 font-semibold">
              Discount
            </strong>
            :<span className="w-9/12 pl-4 text-sm ">{discount}</span>
          </p>
          <p className="flex text-gray-600 mt-5">
            <strong className="w-3/12 text-sm  text-gray-800 font-semibold">
              Total
            </strong>
            :<span className="w-9/12 pl-4 text-sm">{total}</span>
          </p>
        </div>
        {/* end of total amount */}
      </div>
    </div>
  );
}

OrderReceived.Layout = Layout;
