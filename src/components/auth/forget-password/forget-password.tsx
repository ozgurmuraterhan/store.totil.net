import { useState } from "react";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import { useUI } from "@contexts/ui.context";
import { useForgetPasswordMutation } from "@data/auth/use-forget-password.mutation";
import { useVerifyForgetPasswordTokenMutation } from "@data/auth/use-verify-forget-password-token.mutation";
import { useResetPasswordMutation } from "@data/auth/use-reset-password.mutation";
import dynamic from "next/dynamic";
const EnterEmailView = dynamic(() => import("./enter-email-view"));
const EnterTokenView = dynamic(() => import("./enter-token-view"));
const EnterNewPasswordView = dynamic(() => import("./enter-new-password-view"));

const ForgotPassword = () => {
  const { setModalView } = useUI();
  const { mutate: forgetPassword, isLoading } = useForgetPasswordMutation();
  const {
    mutate: verifyToken,
    isLoading: verifying,
  } = useVerifyForgetPasswordTokenMutation();
  const {
    mutate: resetPassword,
    isLoading: resetting,
  } = useResetPasswordMutation();
  const [errorMsg, setErrorMsg] = useState<string | null | undefined>("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [verifiedToken, setVerifiedToken] = useState("");

  function handleEmailSubmit({ email }: { email: string }) {
    forgetPassword(
      {
        email,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setVerifiedEmail(email);
          } else {
            setErrorMsg(data?.message);
          }
        },
      }
    );
  }
  function handleTokenSubmit({ token }: { token: string }) {
    verifyToken(
      {
        email: verifiedEmail,
        token,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setVerifiedToken(token);
          } else {
            setErrorMsg(data?.message);
          }
        },
      }
    );
  }
  function handleResetPassword({ password }: { password: string }) {
    resetPassword(
      {
        email: verifiedEmail,
        token: verifiedToken,
        password,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setModalView("LOGIN_VIEW");
          } else {
            setErrorMsg(data?.message);
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
      <p className="text-center text-sm md:text-base leading-relaxed text-body mt-4 sm:mt-5 mb-7 sm:mb-10">
        We'll send you a link to reset your password
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
      {!verifiedEmail && (
        <EnterEmailView loading={isLoading} onSubmit={handleEmailSubmit} />
      )}
      {verifiedEmail && !verifiedToken && (
        <EnterTokenView loading={verifying} onSubmit={handleTokenSubmit} />
      )}
      {verifiedEmail && verifiedToken && (
        <EnterNewPasswordView
          loading={resetting}
          onSubmit={handleResetPassword}
        />
      )}

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-9 sm:mt-11 mb-7 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute left-2/4 -top-2.5 px-2 -ml-4 bg-white">
          Or
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        Back to{" "}
        <button
          onClick={() => setModalView("LOGIN_VIEW")}
          className="ml-1 underline text-primary font-semibold transition-colors duration-200 focus:outline-none hover:text-primary-2 focus:text-primary-2 hover:no-underline focus:no-underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
