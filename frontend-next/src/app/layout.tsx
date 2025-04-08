import { GenericTextProvider } from "@/context/GenericTextProvider";
import { LanguageProvider } from "@/context/LanguageProvider";
import Head from "next/head";
import "./css/bootstrap.min.css";

export const metadata = {
  title: "ICH Encyclopedia of the Yangtze Delta",
  description: "The Intangible Cultural Heritage Multilingual Encyclopedia of the Yangtze River Delta is a comprehensive platform dedicated to showcasing and preserving the rich and diverse intangible cultural heritage of the Yangtze River Delta.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <body>
        <LanguageProvider>
          <GenericTextProvider>
            {children}
          </GenericTextProvider>
        </LanguageProvider>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" />
        <script src="/assets/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}