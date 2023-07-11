import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { deDE as CommonDE } from "@mui/material/locale";
import { deDE as GridDE } from "@mui/x-data-grid";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const theme = createTheme(
  {
    palette: {
      primary: { main: "#AA0E0E" },
      secondary: { main: "#FFDFDF" },
    },
  },
  {
    ...CommonDE,
    ...GridDE,
  },
);
