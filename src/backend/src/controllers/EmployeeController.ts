import { IDL, query, update } from "azle";
import { EmployeeDto, EmployeeParams, EmployeeParamsDto } from "models";
import EmployeeService from "../services/EmployeeService";
import { IDLEmployee, IDLEmployeeParams } from "../idls";

class EmployeeController {
    @update([IDLEmployeeParams], IDLEmployee)
    async createEmployee(params: EmployeeParamsDto): Promise<EmployeeDto> {
        return EmployeeService.instance.create(EmployeeParams.fromDto(params)).toDto();
    }

    @query([IDL.Nat32], IDLEmployee)
    async readEmployee(id: number): Promise<EmployeeDto> {
        return EmployeeService.instance.read(id).toDto();
    }

    @query([], IDL.Vec(IDLEmployee))
    async readAllEmployees(): Promise<EmployeeDto[]> {
        return EmployeeService.instance.readAll().map((employee) => employee.toDto());
    }

    @update([IDL.Nat32, IDLEmployeeParams], IDLEmployee)
    async updateEmployee(id: number, params: EmployeeParamsDto): Promise<EmployeeDto> {
        return EmployeeService.instance.update(id, EmployeeParams.fromDto(params)).toDto();
    }

    @update([IDL.Nat32])
    async deleteEmployee(id: number): Promise<void> {
        EmployeeService.instance.delete(id);
    }
}

export default EmployeeController;
