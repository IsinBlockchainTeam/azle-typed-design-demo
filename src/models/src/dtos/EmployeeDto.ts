import { Role } from "../entities";

export type EmployeeDto = {
    id: number;
    name: string;
    surname: string;
    role: Role;
    hireDate: bigint;
}

export type EmployeeParamsDto = Omit<EmployeeDto, "id">;