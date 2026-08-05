import { createAccountController } from "./account.controller";
import { accountService } from "./account.service";

export type AccountService = typeof accountService;
export type AccountController = ReturnType<typeof createAccountController>;
