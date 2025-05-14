import { AzleDto, VisibilityLayer, VisibilityLevel } from "../../interfaces";
import { CompanyScopedDto } from "../../dtos";

export class RestrictedCompany extends VisibilityLayer implements AzleDto<CompanyScopedDto> {
    id: number;
    name: string;
    employeesCount: number;
    foundedAt: Date;

    constructor(id: number, name: string, employeesCount: number, foundedAt: Date) {
        super(VisibilityLevel.RESTRICTED);
        this.id = id;
        this.name = name;
        this.employeesCount = employeesCount;
        this.foundedAt = foundedAt;
    }

    static fromDto(dto: CompanyScopedDto): RestrictedCompany {
        return new RestrictedCompany(
            dto.id,
            dto.name,
            dto.employeesCount[0]!,
            new Date(Number(dto.foundedAt))
        );
    }

    toDto(): CompanyScopedDto {
        return {
            visibilityLevel: this.visibilityLevel,
            id: this.id,
            name: this.name,
            employees: [],
            employeesCount: [this.employeesCount],
            foundedAt: BigInt(this.foundedAt.getTime()),
        }
    }
}
