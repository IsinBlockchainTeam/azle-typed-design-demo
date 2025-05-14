import { CompanyParams, CompanyParamsDto, CompanyScopedDto } from "models";
import { IDLCompanyParams, IDLCompanyScoped } from "../idls";
import { update, query, IDL } from "azle";
import CompanyService from "../services/CompanyService";

class CompanyController {
    @update([IDLCompanyParams], IDLCompanyScoped)
    async createCompany(params: CompanyParamsDto): Promise<CompanyScopedDto> {
        return CompanyService.instance.create(CompanyParams.fromDto(params)).toDto();
    }

    @query([IDL.Nat32], IDLCompanyScoped)
    async readCompany(id: number): Promise<CompanyScopedDto> {
        return CompanyService.instance.read(id).toDto();
    }

    @query([], IDL.Vec(IDLCompanyScoped))
    async readAllCompanies(): Promise<CompanyScopedDto[]> {
        return CompanyService.instance.readAll().map((company) => company.toDto());
    }

    @update([IDL.Nat32, IDLCompanyParams], IDLCompanyScoped)
    async updateCompany(id: number, params: CompanyParamsDto): Promise<CompanyScopedDto> {
        return CompanyService.instance.update(id, CompanyParams.fromDto(params)).toDto();
    }

    @update([IDL.Nat32])
    async deleteCompany(id: number): Promise<void> {
        CompanyService.instance.delete(id);
    }
}

export default CompanyController;
