import { Employee, EmployeeParams, Role } from "models";
import { useState } from "react";

export interface EmployeeFormProps {
  employee: Employee | null;
  onClose: () => void;
  addEmployee: (employeeParams: EmployeeParams) => void;
  updateEmployee: (id: number, employeeParams: EmployeeParams) => void;
}

export type EmployeeFormState = {
  name: string;
  surname: string;
  role: Role;
  hireDate: Date;
};

export const EmployeeForm = ({
  employee,
  onClose,
  addEmployee,
  updateEmployee,
}: EmployeeFormProps) => {
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormState>({
    name: employee ? employee.name : "",
    surname: employee ? employee.surname : "",
    role: employee ? employee.role : Role.USER,
    hireDate: employee ? employee.hireDate : new Date(),
  });
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {employee ? "Edit Employee" : "Add New Employee"}
        </h3>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={employeeForm.name}
              onChange={(e) =>
                setEmployeeForm({ ...employeeForm, name: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Surname
            </label>
            <input
              type="text"
              value={employeeForm.surname}
              onChange={(e) =>
                setEmployeeForm({ ...employeeForm, surname: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              value={employeeForm.role}
              onChange={(e) =>
                setEmployeeForm({
                  ...employeeForm,
                  role: Role[e.target.value as keyof typeof Role],
                })
              }
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={Role.ADMIN}>Admin</option>
              <option value={Role.USER}>User</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hire Date
            </label>
            <input
              type="date"
              value={employeeForm.hireDate.toISOString().split("T")[0]}
              onChange={(e) =>
                setEmployeeForm({
                  ...employeeForm,
                  hireDate: new Date(e.target.value),
                })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                onClose();
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                employee
                  ? updateEmployee(
                      employee.id,
                      new EmployeeParams(
                        employeeForm.name,
                        employeeForm.surname,
                        employeeForm.role,
                        employeeForm.hireDate,
                      ),
                    )
                  : addEmployee(
                      new EmployeeParams(
                        employeeForm.name,
                        employeeForm.surname,
                        employeeForm.role,
                        employeeForm.hireDate,
                      ),
                    );
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {employee ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
