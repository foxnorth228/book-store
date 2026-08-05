import fp from "fastify-plugin";

export interface PrismaLike {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
  $transaction: (...args: any[]) => Promise<any>;
}

export interface PrismaLikeConstructor {
  new (options: any): PrismaLike;
}

interface PrismaPluginOptions {
  decoratorName: string;
  PrismaClient: PrismaLikeConstructor;
  prismaClientOptions: ConstructorParameters<PrismaLikeConstructor>[0];
}

export function createPrismaPlugin({
  decoratorName,
  PrismaClient,
  prismaClientOptions,
}: PrismaPluginOptions) {
  return fp(
    async (app) => {
      if (app.hasDecorator(decoratorName)) {
        app.log.warn(`Decorator "${decoratorName}" already registered, skipping.`);
        return;
      }

      const prismaClient = new PrismaClient(prismaClientOptions);

      try {
        await prismaClient.$connect();
        app.log.info(`Database connected for ${decoratorName}`);
      } catch (e) {
        app.log.error(`Failed to start database connection for ${decoratorName}`);
        throw e;
      }

      app.decorate(decoratorName, prismaClient);
      app.addHook("onClose", async (app) => {
        try {
          await prismaClient.$disconnect();
          app.log.info("Database connection closed!");
        } catch (e) {
          app.log.error(`Failed to close database connection for ${decoratorName}`);
          throw e;
        }
      });
    },
    { name: "prisma", fastify: "5.x" },
  );
}
