import { EmployeeParams } from "models";
import { createContext, ReactNode, useContext, useMemo } from "react";
import EmployeeDriver from "../drivers/EmployeeDriver";
import { ICP_CANISTER_ID } from "../constants/icp";
import { Employee } from "models";
import { useIdentity } from "./IdentityProvider";
import { useLoading } from "./LoadingProvider";

export type EmployeeProviderContextState = {
  addEmployee: (employeeParams: EmployeeParams) => Promise<Employee>;
  updateEmployee: (
    id: number,
    employeeParams: EmployeeParams,
  ) => Promise<Employee>;
  deleteEmployee: (id: number) => Promise<void>;
};

export const EmployeeProviderContext =
  createContext<EmployeeProviderContextState>(
    {} as EmployeeProviderContextState,
  );

export const useEmployee = (): EmployeeProviderContextState => {
  const context = useContext(EmployeeProviderContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const { identity } = useIdentity();
  const { loaderCallWrapper } = useLoading();

  const employeeDriver = useMemo(
    () => new EmployeeDriver(identity, ICP_CANISTER_ID.BACKEND),
    [identity],
  );

  const addEmployee = async (employeeParams: EmployeeParams) => {
    return await loaderCallWrapper(() =>
      employeeDriver.createEmployee(employeeParams),
    );
  };

  const updateEmployee = async (id: number, employeeParams: EmployeeParams) => {
    return await loaderCallWrapper(() =>
      employeeDriver.updateEmployee(id, employeeParams),
    );
  };

  const deleteEmployee = async (id: number) => {
    await loaderCallWrapper(() => employeeDriver.deleteEmployee(id));
  };

  return (
    <EmployeeProviderContext.Provider
      value={{ addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeProviderContext.Provider>
  );
}
