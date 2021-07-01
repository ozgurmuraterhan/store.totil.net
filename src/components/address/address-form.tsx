import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import Radio from "@components/ui/radio/radio";
import TextArea from "@components/ui/text-area";
import { useUI } from "@contexts/ui.context";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  title: string;
  type: string;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const addressSchema = yup.object().shape({
  type: yup.string().required("Type is required"),
  title: yup.string().required("Title is required"),
  address: yup.object().shape({
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup.string().required("Zip is required"),
    street_address: yup.string().required("Street Address is required"),
  }),
});

const CreateOrUpdateAddressForm = () => {
  const {
    modalData: { customerId, address, type },
    closeModal,
  } = useUI();
  const { mutate: updateProfile } = useUpdateCustomerMutation();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      title: address?.title ?? "",
      type: address?.type ?? type,
      ...(address?.address && address),
    },
  });
  function onSubmit(values: FormValues) {
    const formattedInput = {
      id: address?.id,
      customer_id: customerId,
      title: values.title,
      type: values.type,
      address: {
        ...(address?.id ? { id: address.id } : {}),
        ...values.address,
      },
    };

    updateProfile({
      id: customerId,
      address: [formattedInput],
    });
    return closeModal();
  }
  return (
    <div className="p-5 sm:p-8 bg-white">
      <h1 className="text-heading font-semibold text-lg text-center mb-4 sm:mb-6">
        {address ? "Update" : "Add New"} Address
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-2 gap-5 h-full"
      >
        <div>
          <Label>Type</Label>

          <div className="space-x-4 flex items-center">
            <Radio
              id="billing"
              {...register("type", { required: "Type is required" })}
              type="radio"
              value="billing"
              label="Billing"
            />

            <Radio
              id="shipping"
              {...register("type", { required: "Type is required" })}
              type="radio"
              value="shipping"
              label="Shipping"
            />
          </div>
        </div>

        <Input
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
          variant="outline"
          className="col-span-2"
        />
        <Input
          label="Country"
          {...register("address.country")}
          error={errors?.address?.country?.message}
          variant="outline"
        />

        <Input
          label="City"
          {...register("address.city")}
          error={errors?.address?.city?.message}
          variant="outline"
        />

        <Input
          label="State"
          {...register("address.state")}
          error={errors?.address?.state?.message}
          variant="outline"
        />

        <Input
          label="ZIP"
          {...register("address.zip")}
          error={errors.address?.zip?.message}
          variant="outline"
        />

        <TextArea
          label="Street Address"
          {...register("address.street_address")}
          error={errors?.address?.street_address?.message}
          variant="outline"
          className="col-span-2"
        />

        <Button className="w-full col-span-2">
          {address ? "Update" : "Save"} Address
        </Button>
      </form>
    </div>
  );
};

export default CreateOrUpdateAddressForm;
