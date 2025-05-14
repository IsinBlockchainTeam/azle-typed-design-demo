import { IDL } from 'azle';

export const IDLEmployee = IDL.Record({
    id: IDL.Nat32,
    name: IDL.Text,
    surname: IDL.Text,
    role: IDL.Text,
    hireDate: IDL.Nat64
});

export const IDLEmployeeParams = IDL.Record({
    name: IDL.Text,
    surname: IDL.Text,
    role: IDL.Text,
    hireDate: IDL.Nat64
});
