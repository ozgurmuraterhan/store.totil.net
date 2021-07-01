import usePrice from "@utils/use-price";
import dayjs from "dayjs";
import cn from "classnames";

type OrderCardProps = {
  order: any;
  isActive: boolean;
  onClick?: (e: any) => void;
};

const OrderCard: React.FC<OrderCardProps> = ({ onClick, order, isActive }) => {
  const { id, status, created_at, delivery_time } = order;
  const { price: amount } = usePrice({
    amount: order?.amount,
  });
  const { price: total } = usePrice({
    amount: order?.total,
  });

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "bg-gray-100 rounded overflow-hidden w-full flex flex-shrink-0 flex-col mb-4 border-2 border-transparent cursor-pointer last:mb-0",
        isActive === true && "border-primary"
      )}
    >
      <div className="flex justify-between items-center border-b border-gray-200 py-3 px-5 md:px-3 lg:px-4">
        <span className="font-bold text-base md:text-sm lg:text-base text-heading mr-4 flex-shrink-0">
          Order
          <span className="font-normal">#{id}</span>
        </span>
        <span
          className="text-sm text-blue-500 bg-blue-100 px-3 py-2 rounded whitespace-nowrap truncate max-w-full"
          title={status.name}
        >
          {status.name}
        </span>
      </div>

      <div className="flex flex-col p-5 md:p-3 lg:px-4 lg:py-5">
        <p className="text-base sm:text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">Order Date</span>
          <span className="mr-auto">:</span>
          <span className="ml-1">
            {dayjs(created_at).format("MMMM D, YYYY")}
          </span>
        </p>
        <p className="text-base sm:text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            Delivery Time
          </span>
          <span className="mr-auto">:</span>
          <span className="ml-1 truncate">{delivery_time}</span>
        </p>
        <p className="text-base sm:text-sm font-bold text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">Amount</span>
          <span className="mr-auto">:</span>
          <span className="ml-1">{amount}</span>
        </p>
        <p className="text-base sm:text-sm font-bold text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            Total Price
          </span>
          <span className="mr-auto">:</span>
          <span className="ml-1">{total}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
