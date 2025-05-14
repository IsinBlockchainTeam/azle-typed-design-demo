import { FactoryService, FullVisibility, RestrictedVisibility } from "../../interfaces";
import { Employee } from "../employee/Employee";
import { CompanyPersistence } from "../../persistences";
import { Persistence } from "../../interfaces";
import { FullCompany } from "../../presentations";
import { RestrictedCompany } from "../../presentations";

export type CompanyScoped = FullCompany | RestrictedCompany;

export class Company implements Persistence<CompanyPersistence>, FullVisibility<FullCompany>, RestrictedVisibility<RestrictedCompany> {
    id: number;
    name: string;
    employees: Employee[];
    foundedAt: Date;

    constructor(id: number, name: string, employees: Employee[], foundedAt: Date) {
        this.id = id;
        this.name = name;
        this.employees = employees;
        this.foundedAt = foundedAt;
    }

    static fromPersistence(persistence: CompanyPersistence, employeeService: FactoryService<number, Employee>): Company {
        return new Company(
            persistence.id,
            persistence.name,
            persistence.employeesId.map(id => employeeService.get(id)),
            new Date(persistence.foundedAt)
        );
    }

    toPersistence(): CompanyPersistence {
        return {
            id: this.id,
            name: this.name,
            employeesId: this.employees.map(e => e.id),
            foundedAt: this.foundedAt.getTime()
        }
    }

    toRestricted(): RestrictedCompany {
        return new RestrictedCompany(this.id, this.name, this.employees.length, this.foundedAt);
    }

    toFull(): FullCompany {
        return new FullCompany(this.id, this.name, this.employees, this.foundedAt);
    }
}
