"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface ColorModeContextType {
  toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeContextType | undefined>(
  undefined
);

export const useColorMode = () => {
  const context = React.useContext(ColorModeContext);
  if (!context) {
    console.log("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: "var(--font-roboto)",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
