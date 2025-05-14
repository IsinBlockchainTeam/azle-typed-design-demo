import { StableBTreeMap } from "azle";
import { Company, CompanyNotFoundError } from "models";
import { StableMemoryId } from "./stableMemory";
import { CompanySerializer } from "./serializers/CompanySerializer";
import { stableJson } from "azle";

class CompanyRepository {
    private static _instance: CompanyRepository;

    private _companies = new StableBTreeMap<number, Company>(StableMemoryId.COMPANIES, stableJson, CompanySerializer());

    private constructor() {}

    static get instance(): CompanyRepository {
        if(!CompanyRepository._instance) {
            CompanyRepository._instance = new CompanyRepository();
        }
        return CompanyRepository._instance;
    }

    create(company: Company): Company {
        this._companies.insert(company.id, company);
        return company;
    }

    read(id: number): Company {
        const company = this._companies.get(id);

        if(!company) {
            throw new CompanyNotFoundError(id);
        }

        return company;
    }

    readAll(): Company[] {
        return this._companies.values();
    }

    update(company: Company): Company {
        this._companies.insert(company.id, company);
        return company;
    }

    delete(id: number): void {
        this._companies.remove(id);
    }

    size(): number {
        return this._companies.len();
    }
}

export default CompanyRepository;
