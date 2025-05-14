export interface FactoryServiceScoped<K, T> {
    getScoped(id: K): T;
}