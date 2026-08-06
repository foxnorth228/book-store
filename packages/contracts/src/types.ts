import { ZodType } from "zod";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface BaseContract<
  TBody extends ZodType = ZodType,
  TResponse extends ZodType = ZodType,
> {
  method: HttpMethod;
  prefix?: string;
  path: string;

  body?: TBody;
  response: TResponse;
}
