import type { AppProps /*, AppContext */ } from "next/app";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@assets/main.css";
import "react-toastify/dist/ReactToastify.css";
import { UIProvider, useUI } from "@contexts/ui.context";
import { SearchProvider } from "@contexts/search.context";
import { CheckoutProvider } from "@contexts/checkout.context";
import ModalContainer from "@components/common/modal/modal-container";
import SidebarContainer from "@components/common/sidebar/sidebar-container";
import ErrorMessage from "@components/ui/error-message";
import { SettingsProvider } from "@contexts/settings.context";
import PageLoader from "@components/ui/page-loader/page-loader";
import { useSettingsQuery } from "@data/settings/use-settings.query";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useRef, useState } from "react";

import { ToastContainer } from "react-toastify";
import { CartProvider } from "@contexts/quick-cart/cart.context";
import Seo from "@components/ui/seo";
import { useSession } from "next-auth/client";
import { useSocialLoginMutation } from "@data/auth/use-social-login-mutation";
import { CUSTOMER } from "@utils/constants";
import Cookies from "js-cookie";

const Noop: React.FC = ({ children }) => <>{children}</>;

const AppSettings: React.FC = (props) => {
	const { data, isLoading: loading, error } = useSettingsQuery();
	if (loading) return <PageLoader />;
	if (error) return <ErrorMessage message={error.message} />;
	return <SettingsProvider initialValue={data?.settings?.options} {...props} />;
};

const SocialLoginProvider: React.FC = () => {
	const [session, loading] = useSession();
	const { mutate: socialLogin } = useSocialLoginMutation();
	const { authorize, isAuthorize } = useUI();
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		// is true when valid social login access token and provider is available in the session
		// but not authorize/logged in yet
		if (!isAuthorize && session?.accessToken && session?.provider) {
			const socialLoginFunction = async () => {
				socialLogin(
					{
						provider: session?.provider as string,
						access_token: session?.accessToken as string,
					},
					{
						onSuccess: (data) => {
							if (data?.token && data?.permissions?.includes(CUSTOMER)) {
								Cookies.set("auth_token", data.token);
								Cookies.set("auth_permissions", data.permissions);
								authorize();
							}
							if (!data.token) {
								setErrorMsg("The credentials was wrong!");
							}
							if (!data.permissions.includes(CUSTOMER)) {
								setErrorMsg("Doesn't have enough permission");
							}
						},
					}
				);
			};
			socialLoginFunction();
		}
	}, [isAuthorize, session]);

	// When rendering client side don't display anything until loading is complete
	if (typeof window !== "undefined" && loading) return null;

	return <div>{errorMsg}</div>;
};

export default function CustomApp({ Component, pageProps }: AppProps) {
	const queryClientRef = useRef<any>(null);
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}
	const Layout = (Component as any).Layout || Noop;
	return (
		<QueryClientProvider client={queryClientRef.current}>
			<Hydrate state={pageProps.dehydratedState}>
				<AppSettings>
					<UIProvider>
						<CartProvider>
							<CheckoutProvider>
								<SearchProvider>
									<Layout>
										<Seo />
										<Component {...pageProps} />
									</Layout>
									<ToastContainer autoClose={2000} />
									<ModalContainer />
									<SidebarContainer />
								</SearchProvider>
							</CheckoutProvider>
						</CartProvider>
						<SocialLoginProvider />
					</UIProvider>
				</AppSettings>
			</Hydrate>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
