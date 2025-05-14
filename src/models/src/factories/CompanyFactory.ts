import { CompanyScoped } from "../entities";
import { CompanyScopedDto } from "../dtos";
import { RestrictedCompany } from "../presentations/company/RestrictedCompany";
import { FullCompany } from "../presentations/company/FullCompany";
import { VisibilityLevel } from "../interfaces";

export abstract class CompanyFactory {
    static fromScopedDto(dto: CompanyScopedDto): CompanyScoped {
        switch (dto.visibilityLevel) {
            case VisibilityLevel.RESTRICTED:
                return RestrictedCompany.fromDto(dto);
            case VisibilityLevel.FULL:
                return FullCompany.fromDto(dto);
            default:
                throw new Error('Invalid visibility level');
        }
    }
}