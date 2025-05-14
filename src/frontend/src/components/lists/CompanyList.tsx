import { useCompany } from "../../providers/CompanyProvider";
import { CompanyScoped, Role } from "models";
import { useIdentity } from "../../providers/IdentityProvider";

export interface CompanyListProps {
  company: CompanyScoped | null;
  setCurrentCompany: (company: CompanyScoped | null) => void;
  setShowCompanyForm: (show: boolean) => void;
}

export const CompanyList = ({
  company: currentCompany,
  setCurrentCompany,
  setShowCompanyForm,
}: CompanyListProps) => {
  const { companies, getEmployeesCount, deleteCompany } = useCompany();
  const { role } = useIdentity();

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Companies</h2>
        {role === Role.ADMIN && (
          <button
            onClick={() => {
              setShowCompanyForm(true);
              setCurrentCompany(null);
            }}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Company
          </button>
        )}
      </div>
      <div className="space-y-3">
        {companies.map((company) => (
          <div
            key={company.id}
            className={`p-4 border rounded cursor-pointer ${currentCompany && currentCompany.id === company.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
            onClick={() => setCurrentCompany(company)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{company.name}</h3>
                <p className="text-sm text-gray-600">
                  Founded: {company.foundedAt.toDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Employees: {getEmployeesCount(company)}
                </p>
              </div>
              {role === Role.ADMIN && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentCompany(company);
                      setShowCompanyForm(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteCompany(company.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
