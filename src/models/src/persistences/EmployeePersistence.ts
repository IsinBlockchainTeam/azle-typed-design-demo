import { Role } from "../entities";

export type EmployeePersistence = {
    id: number;
    name: string;
    surname: string;
    role: Role;
    hireDate: number;
}