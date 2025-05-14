import { CompanyScoped, Employee, Role } from "models";
import { EmployeeDetails } from "./EmployeeDetails";
import { useCompany } from "../../providers/CompanyProvider";
import { useIdentity } from "../../providers/IdentityProvider";

export interface CompanyDetailsProps {
  company: CompanyScoped;
  setCurrentCompany: (company: CompanyScoped | null) => void;
  setCurrentEmployee: (employee: Employee | null) => void;
  setShowEmployeeForm: (show: boolean) => void;
}

export const CompanyDetails = ({
  company,
  setCurrentCompany,
  setCurrentEmployee,
  setShowEmployeeForm,
}: CompanyDetailsProps) => {
  const { getEmployeesCount } = useCompany();
  const { role } = useIdentity();

  return (
    <div className="w-full lg:w-2/3">
      {company ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {company.name} Details
            </h2>
            {role === Role.ADMIN && (
              <button
                onClick={() => {
                  setShowEmployeeForm(true);
                  setCurrentEmployee(null);
                }}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Employee
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600">Company ID:</p>
              <p className="font-medium">{company.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Founded:</p>
              <p className="font-medium">{company.foundedAt.toDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Number of Employees:</p>
              <p className="font-medium">{getEmployeesCount(company)}</p>
            </div>
          </div>

          {role === Role.ADMIN && (
            <EmployeeDetails
              company={company}
              setCurrentCompany={setCurrentCompany}
              setShowEmployeeForm={setShowEmployeeForm}
              setCurrentEmployee={setCurrentEmployee}
            />
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Select a company to view details
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
