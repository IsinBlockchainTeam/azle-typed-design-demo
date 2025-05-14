import { ErrorType } from "./ErrorType";

export class CompanyNotFoundError extends Error {
    constructor(id: number) {
        super(`Company with id ${id} not found`);
        this.name = ErrorType.COMPANY_NOT_FOUND;
    }
}