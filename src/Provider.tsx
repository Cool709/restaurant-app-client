import { ThemeProvider } from "styled-components";
import { COLORS, TEXT_SIZE } from "./config/config";
import { AuthProvider } from "./services/auth.service";

interface ProviderProps {
  children: React.ReactNode;
}

const theme = {
  ...COLORS,
  ...TEXT_SIZE,
};

// ====================
// Theme and auth provider
// ====================
export const Provider = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
