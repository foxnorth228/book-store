import { z } from "zod";

import { profileAdminUserUpdatedSchema, profileSchemas } from "./profile.schemas.js";

export type ProfileMeRes = z.infer<typeof profileSchemas.myProfile.response>;

export type ProfileAdminUserUpdatedDto = z.infer<typeof profileAdminUserUpdatedSchema>;
