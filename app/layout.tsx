import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";

import { CssBaseline, Container, Paper, Box } from "@mui/material";
import TopBar from "@/app/TopBar";
import { ColorModeProvider } from "./ColorModeProvider";
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ColorModeProvider>
            {" "}
            <CssBaseline />
            <Box component={Paper} minHeight={"100vh"}>
              <TopBar />
              <Container sx={{ py: 4 }}>{children}</Container>
            </Box>
          </ColorModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
