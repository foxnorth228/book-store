import { FastifyInstance } from "fastify";

export class ProfileRepository {
  constructor(private module: FastifyInstance) {}

  findById(id: string) {
    return this.module.prisma.profile.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.module.prisma.profile.findUnique({
      where: { email },
    });
  }

  create(data: { email?: string; passwordHash?: string; region: string }) {
    return this.module.prisma.profile.create({
      data,
    });
  }

  update(id: string, data: Partial<{ email: string }>) {
    return this.module.prisma.profile.update({
      where: { id },
      data,
    });
  }
}
