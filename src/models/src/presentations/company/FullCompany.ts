import { AzleDto, VisibilityLayer, VisibilityLevel } from "../../interfaces";
import { Employee } from "../../entities/employee/Employee";
import { CompanyScopedDto } from "../../dtos";

export class FullCompany extends VisibilityLayer implements AzleDto<CompanyScopedDto> {
    id: number;
    name: string;
    employees: Employee[];
    foundedAt: Date;

    constructor(id: number, name: string, employees: Employee[], foundedAt: Date) {
        super(VisibilityLevel.FULL);
        this.id = id;
        this.name = name;
        this.employees = employees;
        this.foundedAt = foundedAt;
    }

    static fromDto(dto: CompanyScopedDto): FullCompany {
        return new FullCompany(
            dto.id,
            dto.name,
            dto.employees[0]!.map(e => Employee.fromDto(e)),
            new Date(Number(dto.foundedAt))
        );
    }

    toDto(): CompanyScopedDto {
        return {
            visibilityLevel: this.visibilityLevel,
            id: this.id,
            name: this.name,
            employees: [this.employees.map(e => e.toDto())],
            employeesCount: [],
            foundedAt: BigInt(this.foundedAt.getTime())
        }
    }
}
