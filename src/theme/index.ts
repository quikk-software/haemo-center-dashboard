import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { deDE } from "@mui/material/locale";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  deDE,
);
