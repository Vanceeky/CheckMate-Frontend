// theme.ts

export type ThemeName = "modern" | "minimal" | "focus" | "academic";

export type Theme = Record<string, string>;

const themes: Record<ThemeName, Theme> = {
  modern: {
    "--primary": "#2563EB",
    "--secondary": "#FACC15",
    "--background": "#F9FAFB",
    "--text": "#111827",
    "--accent": "#10B981",
  },
  minimal: {
    "--primary": "#0D9488",
    "--secondary": "#14B8A6",
    "--background": "#F8FAFC",
    "--text": "#1E293B",
    "--accent": "#F97316",
  },
  focus: {
    "--primary": "#3B82F6",
    "--secondary": "#22C55E",
    "--background": "#FFFFFF",
    "--text": "#0F172A",
    "--accent": "#EF4444",
  },
  academic: {
    "--primary": "#6D28D9",
    "--secondary": "#A78BFA",
    "--background": "#F3F4F6",
    "--text": "#1F2937",
    "--accent": "#F59E0B",
  },
};

export default themes;
