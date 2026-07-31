import { z } from "zod";

export enum Languages {
  En = "en",
  Ru = "ru",
}

export const languagesList = Object.values(Languages);

export const languageSchema = z.enum(languagesList);
