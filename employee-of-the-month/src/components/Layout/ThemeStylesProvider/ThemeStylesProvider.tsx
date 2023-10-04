import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  components: { MuiButton: { defaultProps: { variant: "contained" } } },
});

const ThemeStylesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeStylesProvider;
