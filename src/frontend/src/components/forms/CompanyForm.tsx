import { CompanyParams, FullCompany } from "models";
import { useState } from "react";

export interface CompanyFormProps {
  company: FullCompany | null;
  onClose: () => void;
  addCompany: (companyParams: CompanyParams) => void;
  updateCompany: (id: number, companyParams: CompanyParams) => void;
}

export type CompanyFormState = {
  name: string;
  foundedAt: Date;
};

export const CompanyForm = ({
  company,
  onClose,
  addCompany,
  updateCompany,
}: CompanyFormProps) => {
  const [companyForm, setCompanyForm] = useState<CompanyFormState>({
    name: company ? company.name : "",
    foundedAt: company ? company.foundedAt : new Date(),
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {company ? "Edit Company" : "Add New Company"}
        </h3>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyForm.name}
              onChange={(e) =>
                setCompanyForm({ ...companyForm, name: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Founded Date
            </label>
            <input
              type="date"
              value={companyForm.foundedAt.toISOString().split("T")[0]}
              onChange={(e) =>
                setCompanyForm({
                  ...companyForm,
                  foundedAt: new Date(e.target.value),
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
                company
                  ? updateCompany(
                      company.id,
                      new CompanyParams(
                        companyForm.name,
                        company.employees.map((e) => e.id),
                        companyForm.foundedAt,
                      ),
                    )
                  : addCompany(
                      new CompanyParams(
                        companyForm.name,
                        [],
                        companyForm.foundedAt,
                      ),
                    );
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {company ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
