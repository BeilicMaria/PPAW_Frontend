import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    header?: Palette["primary"];
    dashboard?: Palette["primary"];
    successColor?: Palette["primary"];
    errorColor?: Palette["primary"];
    textColor?: Palette["primary"];
    textColorSecondary?: Palette["primary"];
    blueColor?: Palette["primary"];
    greenColor?: Palette["primary"];
    pinkColor?: Palette["primary"];
    yellowColor?: Palette["primary"];
    orangeColor?: Palette["primary"];
    iconBlue?: Palette["primary"];
    iconDefault?: Palette["primary"];
  }
  interface PaletteOptions {
    header?: PaletteOptions["primary"];
    dashboard?: PaletteOptions["primary"];
    successColor?: PaletteOptions["primary"];
    errorColor?: PaletteOptions["primary"];
    textColor?: PaletteOptions["primary"];
    textColorSecondary?: PaletteOptions["primary"];
    blueColor?: PaletteOptions["primary"];
    greenColor?: PaletteOptions["primary"];
    pinkColor?: PaletteOptions["primary"];
    orangeColor?: PaletteOptions["primary"];
    yellowColor?: PaletteOptions["primary"];
    iconBlue?: PaletteOptions["primary"];
    iconDefault?: PaletteOptions["primary"];
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#bab9bd",
    },
    dashboard: {
      main: "#1e1f25",
    },
    secondary: {
      main: "#1e1f25",
    },
    header: {
      main: "#348BB9",
    },
    successColor: {
      main: "#12A152",
    },
    errorColor: {
      main: "#e57373",
    },
    textColor: {
      main: "black",
    },
    textColorSecondary: {
      main: "white",
    },
    iconDefault: {
      main: "#455a64",
    },
    iconBlue: {
      main: "#2196f3",
    },

    blueColor: {
      main: "#348BB9",
    },
    greenColor: {
      main: "#12A152",
    },
    pinkColor: {
      main: "#f56666",
    },
    yellowColor: {
      main: "#FED049",
    },
    orangeColor: {
      main: "#ff5e00",
    },
  },
  typography: {
    fontSize: 12,
  },
  direction: "ltr",
});
theme = responsiveFontSizes(theme);

export default theme;
