import { ErrorType } from "./ErrorType";

export class EmployeeNotFoundError extends Error {
    constructor(id: number) {
        super(`Employee with id ${id} not found`);
        this.name = ErrorType.EMPLOYEE_NOT_FOUND;
    }
}
    