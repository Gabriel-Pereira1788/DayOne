import { DIKeys, DIValues, ServiceKey, ServiceMap } from "./types";

export class DIContainer {
  private services: ServiceMap = new Map();

  public registerService<Key extends DIKeys>(
    key: Key,
    service: DIValues[Key],
  ): void {
    this.services.set(key, service);
  }

  public getService<Key extends DIKeys>(key: Key): DIValues[Key] {
    if (!this.services.has(key)) {
      throw new Error(`Service with key ${key.toString()} not found`);
    }
    return this.services.get(key);
  }
}
