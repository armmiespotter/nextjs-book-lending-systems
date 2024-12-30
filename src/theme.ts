"use client"
import { createTheme } from "@mui/material/styles";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  shape: {
    borderRadius:8
  },
  cssVariables: true,
  typography: {
    fontFamily: prompt.style.fontFamily,
  },
  palette: {
    background: {
      default: "#EEF2F6",
    },
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default theme;
