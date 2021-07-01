import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface Props {
  onSubmit: (values: { email: string }) => void;
  loading: boolean;
}
const schema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
});

const EnterEmailView = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{ email: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Email"
        {...register("email")}
        type="email"
        variant="outline"
        className="mb-5"
        placeholder="demo@demo.com"
        error={errors.email?.message}
      />
      <Button className="w-full h-11" loading={loading} disabled={loading}>
        Submit Email
      </Button>
    </form>
  );
};

export default EnterEmailView;
