"use client";

import NavBar from "@/components/NavBar";
import { Providers } from "./providers";
import { Container } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Freedive Trainer</title>
      </head>
      <body>
        <Providers>
          <NavBar />
          <Container maxW="full" py={8} px={8}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
