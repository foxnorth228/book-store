import { AccessControlService } from "@org/access-control";

import { accessControlConfig } from "./access-control-config";

export const accessControlService = new AccessControlService(accessControlConfig);
