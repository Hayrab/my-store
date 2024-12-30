import AppShell from "@/components/Fragments/AppShell";
import { ToasterProvider } from "@/context/ToasterContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ToasterProvider>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ToasterProvider>
    </SessionProvider>
  );
}
