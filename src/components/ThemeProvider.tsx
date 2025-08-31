"use client";

import { useState, useEffect, ReactNode } from "react";
import { applyTheme } from "@/lib/applyTheme";
import { ThemeName } from "@/theme/theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("focus");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeName | null;
    if (saved) setTheme(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  if (!mounted) {
    // Optionally return a skeleton, loader, or null until mounted
    return null;
  }

  return <>{children}</>;
}
