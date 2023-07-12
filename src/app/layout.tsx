import { Metadata } from "next";

import AuthContext from "components/AuthContext";
import Footer from "components/Footer";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Notenschnitt",
  authors: [{ name: "Florian Hye", url: "https://hye.dev" }],
  appleWebApp: {
    capable: true,
    title: "Notenschnitt",
    startupImage: "/favicon/apple-touch-icon.png",
    statusBarStyle: "black-translucent",
  },
  icons: [
    { rel: "apple-touch-icon", url: "/favicon/apple-touch-icon.png" },
    { sizes: "32x32", url: "/favicon/favicon-32x32.png" },
    { sizes: "16x16", url: "/favicon/favicon-16x16.png" },
    { rel: "shortcut icon", url: "/favicon/favicon.ico" },
  ],
  manifest: "/manifest.json",
  themeColor: "#163072",
  applicationName: "Notenschnitt",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <AuthContext>
          <div className="body-setup flex min-h-screen flex-col">
            {children}
            <Footer />
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
