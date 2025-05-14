export interface FactoryService<K, T> {
    get(id: K): T;
}
