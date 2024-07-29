import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Simple Auth",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>{children}</body>
      </SessionProvider>
    </html>
  );
}
