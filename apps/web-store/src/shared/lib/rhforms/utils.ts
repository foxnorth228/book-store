import type { TFunction } from "i18next";
import { z } from "zod";

type ZodIssueByCode<C extends z.core.$ZodIssueCode> = Extract<z.core.$ZodIssue, { code: C }>;

type CodeMessages = Partial<{
  [C in z.core.$ZodIssueCode]: (issue: ZodIssueByCode<C>, t: TFunction) => string;
}>;

type FieldOverrides<T> = Partial<Record<keyof T & string, CodeMessages>>;

export function createZodErrorMap<T extends object>(
  t: TFunction,
  fieldOverrides: FieldOverrides<T> = {},
): z.core.$ZodErrorMap {
  return (issue) => {
    const path = (issue.path ?? []).join(".") as keyof T & string;

    const fieldResolver = fieldOverrides[path]?.[issue.code];

    if (fieldResolver) {
      return fieldResolver(issue as never, t);
    }

    return issue.message ?? undefined;
  };
}
