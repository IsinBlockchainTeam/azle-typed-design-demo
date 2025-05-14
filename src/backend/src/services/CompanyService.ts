import { Company, CompanyParams, CompanyScoped, Role } from "models";
import CompanyRepository from "../repositories/CompanyRepository";
import CounterService from "./CounterService";
import EmployeeService from "./EmployeeService";
import IdentityService from "./IdentityService";

class CompanyService {
    private static _instance: CompanyService;

    private _companyRepository: CompanyRepository;

    private _employeeService: EmployeeService;
    private _identityService: IdentityService;
    private _counterService: CounterService;

    private constructor() {
        this._companyRepository = CompanyRepository.instance;
        this._employeeService = EmployeeService.instance;
        this._identityService = IdentityService.instance;
        this._counterService = CounterService.instance;
    }

    static get instance(): CompanyService {
        if(!CompanyService._instance) {
            CompanyService._instance = new CompanyService();
        }
        return CompanyService._instance;
    }

    getScoped(company: Company): CompanyScoped {
        switch (this._identityService.getRole()) {
            case Role.ADMIN:
                return company.toFull();
            case Role.USER:
                return company.toRestricted();
        }
    }

    create(params: CompanyParams): CompanyScoped {
        const company = new Company(
            this._getNextId(),
            params.name,
            [],
            params.foundedAt
        );

        return this.getScoped(this._companyRepository.create(company));
    }

    read(id: number): CompanyScoped {
        return this.getScoped(this._companyRepository.read(id));
    }

    readAll(): CompanyScoped[] {
        return this._companyRepository.readAll().map((company) => this.getScoped(company));
    }

    update(id: number, params: CompanyParams): CompanyScoped {
        const company = this._companyRepository.read(id);
        company.name = params.name;
        company.employees = params.employeesId.map((employeeId) => this._employeeService.read(employeeId));
        company.foundedAt = params.foundedAt;

        return this.getScoped(this._companyRepository.update(company));
    }

    delete(id: number): void {
        this._companyRepository.delete(id);
    }

    private _getNextId(): number {
        return this._counterService.increment(CompanyService.name);
    }
}

export default CompanyService;
