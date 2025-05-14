import EmployeeRepository from "../repositories/EmployeeRepository";
import { Employee, EmployeeParams, FactoryService, Role } from "models";
import { getEnumValueByKey } from "../utils/enum";
import CounterService from "./CounterService";

class EmployeeService implements FactoryService<number, Employee> {
    private static _instance: EmployeeService;

    private _employeeRepository: EmployeeRepository;

    private _counterService: CounterService;

    private constructor() {
        this._employeeRepository = EmployeeRepository.instance;
        this._counterService = CounterService.instance;
    }

    static get instance(): EmployeeService {
        if(!EmployeeService._instance) {
            EmployeeService._instance = new EmployeeService();
        }
        return EmployeeService._instance;
    }

    create(params: EmployeeParams): Employee {
        const employee = new Employee(
            this._getNextId(),
            params.name,
            params.surname,
            getEnumValueByKey(Role, params.role),
            params.hireDate
        );

        return this._employeeRepository.create(employee);
    }

    read(id: number): Employee {
        return this._employeeRepository.read(id);
    }

    get(id: number): Employee {
        return this.read(id);
    }

    readAll(): Employee[] {
        return this._employeeRepository.readAll();
    }

    update(id: number, params: EmployeeParams): Employee {
        const employee = this._employeeRepository.read(id);
        employee.name = params.name;
        employee.surname = params.surname;
        employee.role = getEnumValueByKey(Role, params.role);
        employee.hireDate = params.hireDate;

        return this._employeeRepository.update(employee);
    }

    delete(id: number): void {
        this._employeeRepository.delete(id);
    }

    private _getNextId(): number {
        return this._counterService.increment(EmployeeService.name);
    }
}

export default EmployeeService;
