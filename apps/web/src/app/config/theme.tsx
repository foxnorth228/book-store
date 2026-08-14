import { z } from "zod";

export enum Themes {
  Light = "light",
  Dark = "dark",
}

export const themeSchema = z.enum(Themes);
export type ThemeSchema = z.infer<typeof themeSchema>;
