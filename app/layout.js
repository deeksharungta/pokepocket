import { ReduxProvider } from "@/store/provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PokePocket: Your Portable Pokédex",
  description:
    "A Pokémon directory built using data from the PokeAPI, offering detailed species information. It includes a GPT-3.5-powered chatbot for interacting with your favorite Pokémon.",
  openGraph: {
    title: "PokePocket: Your Portable Pokédex",
    description:
      "A Pokémon directory built using data from the PokeAPI, offering detailed species information. It includes a GPT-3.5-powered chatbot for interacting with your favorite Pokémon.",
    url: "https://pokepocket.vercel.app/",
    siteName: "PokePocket",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/documents/b2ccc7d6-92c5-4d62-a92a-711b9134eff0.png?token=3wFTpxNJvZh7AY_gm-ck7CP4Ng4di3yUTEdbVvCo8MI&height=630&width=1200&expires=33244026189",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
