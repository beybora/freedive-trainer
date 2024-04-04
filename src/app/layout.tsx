'use client'

import { Providers } from "./providers";
import { Container } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Container maxW="full" py={8} px={8}>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
