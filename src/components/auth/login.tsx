import React, { useState } from "react";
import Cookies from "js-cookie";
import { signIn } from "next-auth/client";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@data/auth/use-login.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { CUSTOMER, SUPER_ADMIN } from "@utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FacebookIcon } from "@components/icons/facebook";
import { GoogleIcon } from "@components/icons/google";

type FormValues = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { mutate: login, isLoading: loading } = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const { authorize, setModalView } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginFormSchema),
    defaultValues,
  });

  function onSubmit({ email, password }: FormValues) {
    login(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (
            data?.token &&
            (data?.permissions?.includes(CUSTOMER) ||
              data?.permissions?.includes(SUPER_ADMIN))
          ) {
            Cookies.set("auth_token", data.token);
            Cookies.set("auth_permissions", data.permissions);
            authorize();
            return;
          }
          if (!data.token) {
            setErrorMsg("The credentials was wrong!");
            return;
          }
          if (!data.permissions.includes(CUSTOMER)) {
            setErrorMsg("Doesn't have enough permission");
            return;
          }
        },
      }
    );
  }
  return (
    <div className="py-6 px-5 sm:p-8 bg-white w-screen md:max-w-md h-screen md:h-auto flex flex-col justify-center">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="text-center text-sm md:text-base text-body mt-4 sm:mt-5 mb-8 sm:mb-10">
        Login with your email & password
      </p>
      {errorMsg && (
        <Alert
          variant="error"
          message={errorMsg}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg("")}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-5"
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          {...register("password")}
          error={errors.password?.message}
          variant="outline"
          className="mb-5"
          forgotPageRouteOnClick={() => setModalView("FORGOT_VIEW")}
        />
        <div className="mt-8">
          <Button
            className="w-full h-11 sm:h-12"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </div>
      </form>
      {/* End of forgot login form */}

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute left-2/4 -top-2.5 px-2 -ml-4 bg-white">
          Or
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-2">
        <Button
          className="w-full !bg-social-facebook hover:!bg-social-facebook-hover"
          loading={loading}
          disabled={loading}
          onClick={() => {
            signIn("facebook");
          }}
        >
          <FacebookIcon className="w-4 h-4 mr-3" />
          Login with Facebook
        </Button>
        <Button
          className="!bg-social-google hover:!bg-social-google-hover"
          loading={loading}
          disabled={loading}
          onClick={() => {
            signIn("google");
          }}
        >
          <GoogleIcon className="w-4 h-4 mr-3" />
          Login with Google
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        Don't have any account?{" "}
        <button
          onClick={() => setModalView("REGISTER")}
          className="ml-1 underline text-primary font-semibold transition-colors duration-200 focus:outline-none hover:text-primary-2 focus:text-primary-2 hover:no-underline focus:no-underline"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
