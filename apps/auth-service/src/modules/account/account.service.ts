import { AuthEvents, AuthRole } from "@org/contracts";
import { AccountPermission, Prisma, Role } from "../../libs/prisma/client";
import { BaseService } from "@org/fastify";
import { Languages } from "@org/localization";
import { hashPassword, verifyPassword } from "@org/shared";
import { FastifyInstance } from "fastify";

import { mapPrismaRoleToAuthRole } from "../../libs/prisma-utils/to-auth-role";
import { accountConfig } from "./account.config";
import { InvalidCredentialsError, UserAlreadyExistError } from "./account.errors";
import { AccountRepository } from "./account.repository";
import { SessionService } from "./session.service";
import { SessionPurpose } from "./session.type";
import { mapAccountPermissionsToActions } from "../../libs/prisma-utils/to-auth-action";
import { resolveRolesAndAccountPermissions } from "../../libs/prisma-utils/resolve-permissions";

export class AccountService extends BaseService<AccountRepository> {
  protected readonly repositoryKey = accountConfig.repositoryName;

  constructor(
    app: FastifyInstance,
    private readonly sessionService = new SessionService(app),
  ) {
    super(app);
  }

  async validateCredentials(email: string, password: string) {
    const account = await this.repository.findByEmail(email);

    if (!account) {
      throw new InvalidCredentialsError("Invalid email or password");
    }

    const isPasswordMatch = await verifyPassword(account.passwordHash, password);

    if (!isPasswordMatch) {
      throw new InvalidCredentialsError("Invalid email or password");
    }

    const roles = account.roles.map(({ role }) => role);
    const rolePermissions = await this.repository.findRolePermissions(roles);
    const permissions = resolveRolesAndAccountPermissions(rolePermissions, account.permissions);

    return { account, permissions };
  }

  async login(email: string, password: string) {
    const { account, permissions } = await this.validateCredentials(email, password);

    return this.createSession(account.id, account.roles, permissions);
  }

  async loginAdmin(email: string, password: string) {
    const { account, permissions } = await this.validateCredentials(email, password);

    const isAdmin = account.roles.some(({ role }) => role === AuthRole.ADMIN);

    if (!isAdmin) {
      throw new InvalidCredentialsError("Invalid email or password");
    }

    return this.createSession(account.id, account.roles, permissions, "admin");
  }

  async register(email: string, password: string, language: Languages) {
    const passwordHash = await hashPassword(password);

    try {
      const account = await this.repository.create(email, passwordHash);

      await this.app.rabbitmq.publish(AuthEvents.exchange, AuthEvents.Registered, {
        accountId: account.id,
        language,
      });

      return { id: account.id, email: account.email };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new UserAlreadyExistError("User already exist");
      }

      this.app.log.error(error);
      throw error;
    }
  }

  async refreshTokens(refreshToken: string, purpose: SessionPurpose) {
    return this.sessionService.refreshTokens(refreshToken, purpose);
  }

  async removeSession(refreshToken: string, purpose: SessionPurpose) {
    return this.sessionService.removeSession(refreshToken, purpose);
  }

  private async createSession(
    accountId: string,
    roles: { role: Role }[],
    permissions: AccountPermission[],
    purpose: "user" | "admin" = "user",
  ) {
    const accountRoles = roles.map(({ role }) => mapPrismaRoleToAuthRole(role));
    const accountPermissions = mapAccountPermissionsToActions(permissions);

    const tokens = await this.sessionService.createSession(
      accountId,
      accountRoles,
      accountPermissions,
      purpose,
    );

    return {
      id: accountId,
      ...tokens,
    };
  }
}
