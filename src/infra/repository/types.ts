export enum Collection {
  HABITS = "habits",
  STREAKS = "streaks",
}

export interface IRepositoryImplementation<T> {
  get(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create<DTO>(data: DTO): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  findBy(filter: Partial<T>, options?: FindOptions): Promise<T[]>;
  on(callback: (payload: T) => void): () => void;
}

export interface IBaseRepository<T>
  extends Omit<IRepositoryImplementation<T>, "on"> {
  on(channel: string, callback: (payload: any) => void): () => void;
  setMock?: (data: T[]) => void;
}

export interface IBaseRepositoryBuilder {
  collection<Data>(collection: Collection): IBaseRepository<Data>;
}

export type FindOptions = {
  include?: Record<string, { relation?: string; fields: string[] }>;
  single?: boolean;
};
