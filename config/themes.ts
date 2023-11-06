import blue from "@mui/material/colors/blue";
import createTheme from "@mui/material/styles/createTheme";
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFF",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[500],
    },
  },
});

export const lightThemeWithResponsiveFontSizes =
  responsiveFontSizes(lightTheme);
export const darkThemeWithResponsiveFontSizes = responsiveFontSizes(darkTheme);
