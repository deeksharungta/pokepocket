import { ReduxProvider } from "@/store/provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PokePocket: Your Portable Pokédex",
  description:
    "Carry the world of Pokémon in your pocket with PokePocket! Unleash the power of this ultimate Pokédex companion app, designed for Trainers of all levels. Explore a vast collection of Pokémon species, from the classics to the latest discoveries. Dive into rich profiles showcasing captivating artwork, comprehensive details, and in-depth insights into each creature's traits, evolutions, and habitats. Whether you're on a quest to catch 'em all or seeking knowledge to outsmart your opponents, PokePocket is your indispensable tool on the journey to becoming a Pokémon Master.",
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
