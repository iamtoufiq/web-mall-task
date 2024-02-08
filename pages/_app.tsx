import Layout from "@/components/Layout";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import EditFormModal from "@/components/modals/EditFormModal";
import SignInModal from "@/components/modals/SignInModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <SignInModal />
        <Toaster />
        <RegisterModal />
        <EditFormModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
