import { z } from "zod";

import { profileSchemas } from "./profile.schemas.js";

export type ProfileMeRes = z.infer<typeof profileSchemas.myProfile.response>;
