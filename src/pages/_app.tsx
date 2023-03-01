import Nav from "@/layout/nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <>
      <Nav></Nav>
      <Component {...pageProps} />
    </>
  );
}
