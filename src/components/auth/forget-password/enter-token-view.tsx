import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface Props {
  onSubmit: (values: { token: string }) => void;
  loading: boolean;
}
const schema = yup.object().shape({
  token: yup.string().required("Password is required"),
});

const EnterTokenView = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Put your token you got from email"
        {...register("token")}
        variant="outline"
        className="mb-5"
        error={errors.token?.message}
      />
      <Button className="w-full h-11" loading={loading} disabled={loading}>
        Submit Token
      </Button>
    </form>
  );
};

export default EnterTokenView;
