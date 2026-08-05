import { FastifyInstance } from "fastify";

export abstract class BaseRepository<TDb> {
  protected abstract readonly databaseKey: string;

  constructor(protected readonly app: FastifyInstance) {}

  protected get db() {
    return this.app.getDecorator<TDb>(this.databaseKey);
  }
}

export abstract class BaseService<TRepo> {
  protected abstract readonly repositoryKey: string;

  constructor(protected readonly app: FastifyInstance) {}

  protected get repository() {
    return this.app.getDecorator<TRepo>(this.repositoryKey);
  }
}

export abstract class BaseController<TService> {
  protected abstract readonly serviceKey: string;

  constructor(protected readonly app: FastifyInstance) {}

  protected get service() {
    return this.app.getDecorator<TService>(this.serviceKey);
  }
}
