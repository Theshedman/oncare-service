export interface DbAccess {
  create<T>(data: T): Promise<T>;

  findAll(): Promise<any>;

  findOne<T>(data: T): Promise<T>;

  findById(id: string): Promise<any>;

  update<T>(id: string, data: T): Promise<any>;

  delete(id: string): Promise<any>;
}
