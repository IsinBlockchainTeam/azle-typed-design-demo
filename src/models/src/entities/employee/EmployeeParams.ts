import { Role } from "./Employee";
import { EmployeeParamsDto } from "../../dtos";
import { AzleDto } from "../../interfaces";

export class EmployeeParams implements AzleDto<EmployeeParamsDto> {
    name: string;
    surname: string;
    role: Role;
    hireDate: Date;

    constructor(name: string, surname: string, role: Role, hireDate: Date) {
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.hireDate = hireDate;
    }

    static fromDto(dto: EmployeeParamsDto): EmployeeParams {
        return new EmployeeParams(
            dto.name,
            dto.surname,
            dto.role,
            new Date(Number(dto.hireDate))
        );
    }

    toDto(): EmployeeParamsDto {
        return {
            name: this.name,
            surname: this.surname,
            role: this.role,
            hireDate: BigInt(this.hireDate.getTime())
        }
    }
}