// lib/applyTheme.ts
import themes, { ThemeName } from "@/theme/theme";

export function applyTheme(themeName: ThemeName) {
  const theme = themes[themeName];
  if (!theme) return;

  for (const [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(key, value);
  }
}
