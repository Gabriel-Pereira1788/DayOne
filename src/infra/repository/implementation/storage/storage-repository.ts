import {
  Collection,
  FindOptions,
  IBaseRepository,
  IBaseRepositoryBuilder,
} from "../../types";
import { DIContainerRef } from "@/infra/DI/hook/useDIContainer";
import { DIKeys } from "@/infra/DI/types";

class StorageRepository<Data = unknown> implements IBaseRepository<Data> {
  constructor(private readonly collection: Collection) {}
  private getStorageService() {
    return DIContainerRef.current!.getService(DIKeys.Storage);
  }
  public async get() {
    const storage = this.getStorageService();
    const data = await storage.getItem<Data[]>(this.collection);
    return data || [];
  }

  public async findById(id: string): Promise<Data> {
    const storage = this.getStorageService();
    const data = await storage.getItem<(Data & { id: string })[]>(
      this.collection,
    );

    const findedData = data?.find((item) => item.id === id) as Data;
    return findedData;
  }

  public async create<DTO>(data: DTO) {
    const storage = this.getStorageService();
    const dataList = await storage.getItem<Data[]>(this.collection);

    if (!dataList) {
      storage.setItem(this.collection, [data]);
    } else {
      storage.setItem(this.collection, [...dataList, data]);
    }

    return data as unknown as Data;
  }

  public async update<T>(id: string, data: Partial<T>) {
    const storage = this.getStorageService();
    const item = await this.findById(id);
    if (!item) throw new Error("Item not found");

    const dataList =
      (await storage.getItem<(Data & { id: string })[]>(this.collection)) || [];
    const updatedData = dataList.map((item) =>
      item.id === id ? { ...item, ...data } : item,
    );
    storage.setItem(this.collection, updatedData);

    return updatedData.find((item) => item.id === id) as unknown as Data;
  }

  public async delete(id: string) {
    const storage = this.getStorageService();
    const item = await this.findById(id);
    if (!item) throw new Error("Item has been deleted");
    const dataList =
      (await storage.getItem<(unknown & { id: string })[]>(this.collection)) ||
      [];
    const updatedData = dataList.filter((item) => item.id !== id);
    storage.setItem(this.collection, updatedData);
  }

  public async findBy(
    filter: Partial<Data>,
    options?: FindOptions,
  ): Promise<Data[]> {
    const storage = this.getStorageService();
    const data = await storage.getItem<Data[]>(this.collection);

    if (!data || data.length === 0) {
      return [];
    }

    const filteredData = data.filter((item) => {
      return Object.entries(filter).every(([key, value]) => {
        if (typeof value === "number") {
          return (item as any)[key as keyof typeof item] === value;
        }
        if (typeof value === "string") {
          return (item as any)[key as keyof typeof item]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return (item as any)[key] === value;
      });
    });

    if (options?.single) {
      return filteredData.slice(0, 1);
    }

    return filteredData;
  }

  public on() {
    return () => {};
  }
}

export class StorageRepositoryBuilder implements IBaseRepositoryBuilder {
  constructor() {}

  collection<Data>(collection: Collection) {
    return new StorageRepository<Data>(collection);
  }
}

export const storageRepositoryBuilder = new StorageRepositoryBuilder();
