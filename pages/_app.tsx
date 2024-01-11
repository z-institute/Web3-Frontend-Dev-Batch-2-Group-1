import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "buffer";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
