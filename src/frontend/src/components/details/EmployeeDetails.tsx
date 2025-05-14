import { CompanyScoped, Employee, FullCompany, Role } from "models";
import { useCompany } from "../../providers/CompanyProvider";
import { useIdentity } from "../../providers/IdentityProvider";

export interface EmployeeDetailsProps {
  company: CompanyScoped;
  setCurrentCompany: (company: CompanyScoped | null) => void;
  setShowEmployeeForm: (show: boolean) => void;
  setCurrentEmployee: (employee: Employee | null) => void;
}

export const EmployeeDetails = ({
  company,
  setCurrentCompany,
  setShowEmployeeForm,
  setCurrentEmployee,
}: EmployeeDetailsProps) => {
  const { role } = useIdentity();
  const { removeEmployeeFromCompany, getCompany } = useCompany();

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Employees</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              {role === Role.ADMIN && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Surname
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hire Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {role === Role.ADMIN &&
              (company as FullCompany).employees?.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.name}
                  </td>
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.surname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.role === Role.ADMIN
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.hireDate.toDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setCurrentEmployee(employee);
                          setShowEmployeeForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          await removeEmployeeFromCompany(
                            company.id,
                            employee.id,
                          );
                          const updatedCompany = await getCompany(company.id);
                          setCurrentCompany(updatedCompany);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDetails;
