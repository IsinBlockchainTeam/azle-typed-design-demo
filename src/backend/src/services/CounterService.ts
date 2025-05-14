import CounterRepository from "../repositories/CounterRepository";

class CounterService {
    private static _instance: CounterService;

    private _counterRepository: CounterRepository;

    private constructor() {
        this._counterRepository = CounterRepository.instance;
    }

    static get instance(): CounterService {
        if(!CounterService._instance) {
            CounterService._instance = new CounterService();
        }
        return CounterService._instance;
    }

    increment(key: string): number {
        return this._counterRepository.increment(key);
    }
}

export default CounterService;
