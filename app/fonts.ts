import { Fredoka, Nunito_Sans } from "next/font/google";

/**
 * Mismas dos familias que usaba el HTML original, pero servidas por Next
 * (self-hosted, sin peticiones a fonts.googleapis.com y sin FOUT).
 * Ambas son variables, así que cubren todo el rango de pesos que usa el CSS.
 */
export const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});
