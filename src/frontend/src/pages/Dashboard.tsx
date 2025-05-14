import {
  CompanyParams,
  CompanyScoped,
  Employee,
  EmployeeParams,
  FullCompany,
  Role,
} from "models";
import { useEffect, useState } from "react";
import TopBar from "../components/headers/TopBar";
import CompanyList from "../components/lists/CompanyList";
import { useCompany } from "../providers/CompanyProvider";
import CompanyDetails from "../components/details/CompanyDetails";
import CompanyForm from "../components/forms/CompanyForm";
import EmployeeForm from "../components/forms/EmployeeForm";
import { useEmployee } from "../providers/EmployeeProvider";
import { useIdentity } from "../providers/IdentityProvider";
import { useLoading } from "../providers/LoadingProvider";
import Loader from "../components/loader/Loader";

const Dashboard = () => {
  const {
    loadData,
    getCompany,
    addCompany,
    updateCompany,
    addEmployeeToCompany,
  } = useCompany();
  const { addEmployee, updateEmployee } = useEmployee();
  const { role } = useIdentity();
  const { isLoading } = useLoading();

  const [currentCompany, setCurrentCompany] = useState<CompanyScoped | null>(
    null,
  );
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [showCompanyForm, setShowCompanyForm] = useState<boolean>(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (currentCompany) {
      getCompany(currentCompany.id).then((company) =>
        setCurrentCompany(company),
      );
    }
  }, [role]);

  const addEmployeeToCompanyWrapper = async (
    companyId: number,
    employeeParams: EmployeeParams,
  ) => {
    const employee = await addEmployee(employeeParams);
    const company = await addEmployeeToCompany(companyId, employee.id);

    setCurrentCompany(company);
  };

  const updateCompanyWrapper = async (
    id: number,
    companyParams: CompanyParams,
  ) => {
    const company = await updateCompany(id, companyParams);
    setCurrentCompany(company);
  };

  const updateEmployeeWrapper = async (
    id: number,
    employeeParams: EmployeeParams,
  ) => {
    await updateEmployee(id, employeeParams);

    const company = await getCompany(
      (currentCompany as unknown as FullCompany).id,
    );
    setCurrentCompany(company);

    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <TopBar title="Azle Typed Design Demo" />

        {isLoading && <Loader text="Loading..." />}

        <div className="flex flex-col lg:flex-row gap-6">
          <CompanyList
            company={currentCompany}
            setCurrentCompany={setCurrentCompany}
            setShowCompanyForm={setShowCompanyForm}
          />

          {currentCompany && (
            <CompanyDetails
              company={currentCompany}
              setCurrentCompany={setCurrentCompany}
              setCurrentEmployee={setCurrentEmployee}
              setShowEmployeeForm={setShowEmployeeForm}
            />
          )}

          {showCompanyForm && role === Role.ADMIN && (
            <CompanyForm
              company={currentCompany as FullCompany}
              onClose={() => setShowCompanyForm(false)}
              addCompany={addCompany}
              updateCompany={updateCompanyWrapper}
            />
          )}

          {showEmployeeForm && (
            <EmployeeForm
              employee={currentEmployee}
              onClose={() => setShowEmployeeForm(false)}
              addEmployee={(employeeParams: EmployeeParams) =>
                addEmployeeToCompanyWrapper(currentCompany!.id, employeeParams)
              }
              updateEmployee={updateEmployeeWrapper}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
