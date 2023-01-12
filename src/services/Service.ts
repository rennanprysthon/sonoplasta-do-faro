export abstract class Service {
  abstract execute(agrs?: any): Promise<void>;
}
