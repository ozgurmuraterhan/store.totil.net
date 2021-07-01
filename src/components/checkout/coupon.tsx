import { useState } from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useCheckout } from "@contexts/checkout.context";
import { useVerifyCouponMutation } from "@data/coupon/verify-coupon.mutation";

const Coupon = () => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm();
  const {
    mutate: verifyCoupon,
    isLoading: loading,
  } = useVerifyCouponMutation();
  const { applyCoupon, coupon } = useCheckout();
  if (!hasCoupon && !coupon) {
    return (
      <p
        role="button"
        className="text-xs font-bold text-body transition duration-200 hover:text-primary"
        onClick={() => setHasCoupon(true)}
      >
        Do you have a coupon?
      </p>
    );
  }
  async function onSubmit({ code }: { code: string }) {
    verifyCoupon(
      {
        code,
      },
      {
        onSuccess: (data) => {
          if (data.is_valid) {
            applyCoupon(data.coupon);
            setHasCoupon(false);
          } else {
            setError("code", {
              type: "manual",
              message: "Invalid coupon code! please try again.",
            });
          }
        },
      }
    );
    // if (data?.verifyCoupon?.is_valid) {
    //   applyCoupon(data?.verifyCoupon?.coupon);
    //   setHasCoupon(false);
    // } else if (!data?.verifyCoupon?.is_valid) {
    //   setError("code", {
    //     type: "manual",
    //     message: "Invalid coupon code! please try again.",
    //   });
    // }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full flex flex-col sm:flex-row"
    >
      <Input
        {...register("code", { required: "Coupon code is required" })}
        placeholder="Enter coupon code here"
        variant="outline"
        className="mb-4 sm:mb-0 sm:mr-4 flex-1"
        dimension="small"
        error={errors?.code?.message}
      />
      <Button
        loading={loading}
        disabled={loading}
        size="small"
        className="w-full sm:w-40 lg:w-auto"
      >
        Apply
      </Button>
    </form>
  );
};

export default Coupon;
