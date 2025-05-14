import { StableBTreeMap, stableJson } from "azle";
import { Employee, EmployeeNotFoundError } from "models";
import { StableMemoryId } from "./stableMemory";
import { EmployeeSerializer } from "./serializers/EmployeeSerializer";

class EmployeeRepository {
    private static _instance: EmployeeRepository;

    private _employees = new StableBTreeMap<number, Employee>(StableMemoryId.EMPLOYEES, stableJson, EmployeeSerializer());

    private constructor() {}

    static get instance(): EmployeeRepository {
        if(!EmployeeRepository._instance) {
            EmployeeRepository._instance = new EmployeeRepository();
        }
        return EmployeeRepository._instance;
    }

    create(employee: Employee): Employee {
        this._employees.insert(employee.id, employee);
        return employee;
    }

    read(id: number): Employee {
        const employee = this._employees.get(id);

        if(!employee) {
            throw new EmployeeNotFoundError(id);
        }

        return employee;
    }

    readAll(): Employee[] {
        return this._employees.values();
    }

    update(employee: Employee): Employee {
        this._employees.insert(employee.id, employee);
        return employee;
    }

    delete(id: number): void {
        this._employees.remove(id);
    }

    size(): number {
        return this._employees.len();
    }
}

export default EmployeeRepository;
