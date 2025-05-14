import { VisibilityLayerDto } from "../interfaces";
import { EmployeeDto } from "./EmployeeDto";

export type CompanyDto = {
    id: number;
    name: string;
    employees: EmployeeDto[];
    foundedAt: bigint;
}

export type CompanyParamsDto = Omit<CompanyDto, "id" | "employees"> & {
    employeesId: Uint32Array;
};

export type CompanyScopedDto = Omit<CompanyDto, "employees"> & VisibilityLayerDto & {
    employees: [EmployeeDto[]] | [];
    employeesCount: [number] | [];
};
    