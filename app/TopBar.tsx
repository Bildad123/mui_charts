"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import HomeIcon from "@mui/icons-material/Home";

import { useColorMode } from "./ColorModeProvider";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const theme = useTheme();
  const colorMode = useColorMode();
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar
          variant="dense"
          sx={{
            bgcolor: "background.paper",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => router.push('/')} >
            <HomeIcon />
          </IconButton>
          <IconButton onClick={colorMode?.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </ThemeProvider>
  );
};

export default TopBar;
