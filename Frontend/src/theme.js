// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#edf2f7",
      100: "#ced4da",
      200: "#adb5bd",
      300: "#868e96",
      400: "#495057",
      500: "#343a40",
      600: "#212529",
      700: "#16181b",
      800: "#0d0d0d",
      900: "#000000",
    },
    secondary: {
      50: "#f8f9fa",
      100: "#e9ecef",
      200: "#dee2e6",
      300: "#ced4da",
      400: "#adb5bd",
      500: "#6c757d",
      600: "#495057",
      700: "#343a40",
      800: "#212529",
      900: "#16181b",
    },
    accent: "#A40033", // Color de acento para resaltar información
  },
  styles: {
    global: {
      body: {
        bg: "#28264C", // Fondo oscuro
        color: "black", // Color de texto blanco
      },
    },
  },
});

export default theme;
