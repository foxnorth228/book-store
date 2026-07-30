import { authContracts } from "@org/contracts";
import z from "zod";

export type AuthLoginReq = z.infer<typeof authContracts.login.body>;
export type AuthLoginRes = z.infer<typeof authContracts.login.response>;
