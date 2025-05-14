import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CompanyScoped,
  CompanyParams,
  FullCompany,
  Role,
  RestrictedCompany,
} from "models";
import CompanyDriver from "../drivers/CompanyDriver";
import { ICP_CANISTER_ID } from "../constants/icp";
import { useIdentity } from "./IdentityProvider";
import { useLoading } from "./LoadingProvider";

export type CompanyProviderContextState = {
  companies: CompanyScoped[];
  loadData: () => Promise<void>;
  getCompany: (id: number) => Promise<CompanyScoped>;
  getEmployeesCount: (company: CompanyScoped) => number;
  addCompany: (companyParams: CompanyParams) => Promise<CompanyScoped>;
  updateCompany: (
    id: number,
    companyParams: CompanyParams,
  ) => Promise<CompanyScoped>;
  addEmployeeToCompany: (
    companyId: number,
    employeeId: number,
  ) => Promise<CompanyScoped>;
  removeEmployeeFromCompany: (
    companyId: number,
    employeeId: number,
  ) => Promise<CompanyScoped>;
  deleteCompany: (id: number) => Promise<void>;
};

export const CompanyProviderContext =
  createContext<CompanyProviderContextState>({} as CompanyProviderContextState);

export const useCompany = (): CompanyProviderContextState => {
  const context = useContext(CompanyProviderContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export function CompanyProvider({ children }: { children: ReactNode }) {
  const { identity, role } = useIdentity();
  const { loaderCallWrapper } = useLoading();
  const [companies, setCompanies] = useState<CompanyScoped[]>([]);

  const companyDriver = useMemo(
    () => new CompanyDriver(identity, ICP_CANISTER_ID.BACKEND),
    [identity],
  );

  useEffect(() => {
    loadData();
  }, [role]);

  const loadData = async () => {
    const companies = await loaderCallWrapper(() =>
      companyDriver.readAllCompanies(),
    );

    setCompanies(companies);
  };

  const getCompany = async (id: number) => {
    return loaderCallWrapper(() => companyDriver.readCompany(id));
  };

  const getEmployeesCount = (company: CompanyScoped) => {
    switch (role) {
      case Role.ADMIN:
        return (company as FullCompany).employees?.length;
      case Role.USER:
        return (company as RestrictedCompany).employeesCount;
    }
  };

  const addCompany = async (companyParams: CompanyParams) => {
    const company = await loaderCallWrapper(() =>
      companyDriver.createCompany(companyParams),
    );
    loadData();
    return company;
  };

  const updateCompany = async (id: number, companyParams: CompanyParams) => {
    const company = await loaderCallWrapper(() =>
      companyDriver.updateCompany(id, companyParams),
    );
    loadData();
    return company;
  };

  const addEmployeeToCompany = async (
    companyId: number,
    employeeId: number,
  ) => {
    const company = (await loaderCallWrapper(() =>
      getCompany(companyId),
    )) as FullCompany;
    const companyParams = new CompanyParams(
      company.name,
      company.employees.map((e) => e.id),
      company.foundedAt,
    );
    companyParams.employeesId.push(employeeId);

    await loaderCallWrapper(() =>
      companyDriver.updateCompany(companyId, companyParams),
    );
    loadData();

    return getCompany(companyId);
  };

  const removeEmployeeFromCompany = async (
    companyId: number,
    employeeId: number,
  ) => {
    const company = (await loaderCallWrapper(() =>
      getCompany(companyId),
    )) as FullCompany;
    const companyParams = new CompanyParams(
      company.name,
      company.employees.map((e) => e.id),
      company.foundedAt,
    );
    companyParams.employeesId = companyParams.employeesId.filter(
      (e) => e !== employeeId,
    );

    await loaderCallWrapper(() =>
      companyDriver.updateCompany(companyId, companyParams),
    );
    loadData();

    return getCompany(companyId);
  };

  const deleteCompany = async (id: number) => {
    await loaderCallWrapper(() => companyDriver.deleteCompany(id));
    loadData();
  };

  return (
    <CompanyProviderContext.Provider
      value={{
        companies,
        loadData,
        getCompany,
        getEmployeesCount,
        addCompany,
        updateCompany,
        addEmployeeToCompany,
        removeEmployeeFromCompany,
        deleteCompany,
      }}
    >
      {children}
    </CompanyProviderContext.Provider>
  );
}
