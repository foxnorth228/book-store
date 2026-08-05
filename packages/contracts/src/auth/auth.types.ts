import { z } from "zod";

import { authContracts } from "./auth.contracts.js";
import { authAccountRegisteredSchema } from "./auth.schemas.js";

export type AuthLoginReq = z.infer<typeof authContracts.login.body>;
export type AuthLoginRes = z.infer<typeof authContracts.login.response>;

export type AuthRegisterReq = z.infer<typeof authContracts.register.body>;
export type AuthRegisterRes = z.infer<typeof authContracts.register.response>;

export type AuthAccountRegisteredEventDto = z.infer<typeof authAccountRegisteredSchema>;
