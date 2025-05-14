import { AzleDto } from "../../interfaces";
import { CompanyParamsDto } from "../../dtos";

export class CompanyParams implements AzleDto<CompanyParamsDto> {
    name: string;
    employeesId: number[];
    foundedAt: Date;

    constructor(name: string, employeesId: number[], foundedAt: Date) {
        this.name = name;
        this.employeesId = employeesId;
        this.foundedAt = foundedAt;
    }

    static fromDto(dto: CompanyParamsDto): CompanyParams {
        return new CompanyParams(dto.name, Array.from(dto.employeesId), new Date(Number(dto.foundedAt)));
    }

    toDto(): CompanyParamsDto {
        return {
            name: this.name,
            employeesId: Uint32Array.from(this.employeesId),
            foundedAt: BigInt(this.foundedAt.getTime())
        }
    }
}