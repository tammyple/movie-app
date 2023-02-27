import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { deepOrange, grey } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[500],
    },
    divider: deepOrange[700],
    background: {
      default: "#121212",
      paper: "#121212",
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
});

function ThemeProvider({ children }) {
  return (
    <MUIThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
