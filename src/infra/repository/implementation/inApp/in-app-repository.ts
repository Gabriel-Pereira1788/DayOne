import {
  Collection,
  FindOptions,
  IBaseRepository,
  IBaseRepositoryBuilder,
} from "../../types";

const mockRepository = new Map<string, unknown>();

class InAppRepository<Data = unknown> implements IBaseRepository<Data> {
  constructor(private readonly collection: Collection) {}

  public async get() {
    const data = mockRepository.get(this.collection) as Data[];
    return data || [];
  }

  public async findById(id: string): Promise<Data> {
    const data = mockRepository.get(this.collection) as (Data & {
      id: string;
    })[];

    const findedData = data?.find((item) => item.id === id) as Data;
    return findedData;
  }

  public async create<DTO>(data: DTO) {
    const dataList = mockRepository.get(this.collection) as Data[];

    if (!dataList) {
      mockRepository.set(this.collection, [data]);
    } else {
      mockRepository.set(this.collection, [...dataList, data]);
    }

    return data as unknown as Data;
  }

  public async update<T>(id: string, data: Partial<T>) {
    const item = await this.findById(id);
    if (!item) throw new Error("Item not found");

    const dataList = ((await mockRepository.get(this.collection)) ||
      []) as (Data & { id: string })[];

    const updatedData = dataList.map((item) =>
      item.id === id ? { ...item, ...data } : item,
    );

    mockRepository.set(this.collection, updatedData);

    return updatedData.find((item) => item.id === id) as unknown as Data;
  }

  public async delete(id: string) {
    const item = await this.findById(id);
    if (!item) throw new Error("Item has been deleted");
    const dataList = (mockRepository.get(this.collection) || []) as (unknown & {
      id: string;
    })[];
    const updatedData = dataList.filter((item) => item.id !== id);
    mockRepository.set(this.collection, updatedData);
  }

  public async findBy(
    filter: Partial<Data>,
    options?: FindOptions,
  ): Promise<Data[]> {
    const data = mockRepository.get(this.collection) as Data[];

    if (!data || data.length === 0) {
      return [];
    }

    const filteredData = data.filter((item) => {
      return Object.entries(filter).every(([key, value]) => {
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

  public setMock(data: Data[]) {
    mockRepository.set(this.collection, data);
  }
}

export class InAppRepositoryBuilder implements IBaseRepositoryBuilder {
  constructor() {}

  collection<Data>(collection: Collection) {
    return new InAppRepository<Data>(collection);
  }
}

export const inAppRepositoryBuilder = new InAppRepositoryBuilder();
