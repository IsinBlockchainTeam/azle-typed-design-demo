import { EmployeeDto } from "../../dtos";
import { Persistence, AzleDto } from "../../interfaces";
import { EmployeePersistence } from "../../persistences";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class Employee implements Persistence<EmployeePersistence>, AzleDto<EmployeeDto> {
    id: number;
    name: string;
    surname: string;
    role: Role;
    hireDate: Date;

    constructor(id: number, name: string, surname: string, role: Role, hireDate: Date) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.hireDate = hireDate;
    }

    static fromPersistence(persistence: EmployeePersistence): Employee {
        return new Employee(
            persistence.id,
            persistence.name,
            persistence.surname,
            persistence.role,
            new Date(persistence.hireDate)
        );
    }

    static fromDto(dto: EmployeeDto): Employee {
        return new Employee(
            dto.id,
            dto.name,
            dto.surname,
            dto.role,
            new Date(Number(dto.hireDate))
        );
    }

    toPersistence(): EmployeePersistence {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            role: this.role,
            hireDate: this.hireDate.getTime()
        }
    }

    toDto(): EmployeeDto {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            role: this.role,
            hireDate: BigInt(this.hireDate.getTime())
        }
    }
}
