import { IDLEmployee } from "./Employee";
import { IDL } from "azle";

export const IDLCompany = IDL.Record({
    id: IDL.Nat32,
    name: IDL.Text,
    employees: IDL.Vec(IDLEmployee),
    foundedAt: IDL.Nat64
});

export const IDLCompanyParams = IDL.Record({
    name: IDL.Text,
    employeesId: IDL.Vec(IDL.Nat32),
    foundedAt: IDL.Nat64
});

export const IDLCompanyScoped = IDL.Record({
    visibilityLevel: IDL.Text,
    id: IDL.Nat32,
    name: IDL.Text,
    employees: IDL.Opt(IDL.Vec(IDLEmployee)),
    employeesCount: IDL.Opt(IDL.Nat32),
    foundedAt: IDL.Nat64
});
