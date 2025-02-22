import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript, Stack } from "@mantine/core";
import { theme } from "../theme";
import { Roboto } from "next/font/google";
import '@mantine/charts/styles.css';

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zebracorns Scouting",
  description:
    "The Scouting Site of the Zebracorns using Nextjs, Mantine, Vanilla Extract, and other cool tools!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <Stack align="stretch" justify="flex-start" gap="xs" pb="md">
              {children}
            </Stack>
          </MantineProvider>
      </body>
    </html>
  );
}
