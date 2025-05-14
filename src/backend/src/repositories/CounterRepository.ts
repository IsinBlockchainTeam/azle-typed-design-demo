import { StableBTreeMap } from "azle";
import { StableMemoryId } from "./stableMemory";

class CounterRepository {
    private static _instance: CounterRepository;

    private _counters = new StableBTreeMap<string, number>(StableMemoryId.COUNTERS);

    private constructor() {}

    static get instance(): CounterRepository {
        if(!CounterRepository._instance) {
            CounterRepository._instance = new CounterRepository();
        }
        return CounterRepository._instance;
    }

    increment(key: string): number {
        const counter = this._counters.get(key);

        if(!counter) {
            this._counters.insert(key, 1);
            return 1;
        }

        this._counters.insert(key, counter + 1);
        return counter + 1;
    }


}

export default CounterRepository;
