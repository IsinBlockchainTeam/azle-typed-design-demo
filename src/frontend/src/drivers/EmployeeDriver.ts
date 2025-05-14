import { Employee, EmployeeDto, EmployeeParams } from "models";
import { createActor } from "../../../declarations/backend";
import { _SERVICE } from "../../../declarations/backend/backend.did";
import { ActorSubclass, Identity } from "@dfinity/agent";

export class EmployeeDriver {
  private _actor: ActorSubclass<_SERVICE>;

  public constructor(icpIdentity: Identity, canisterId: string, host?: string) {
    this._actor = createActor(canisterId, {
      agentOptions: {
        identity: icpIdentity,
        ...(host && { host }),
      },
    });
  }

  async createEmployee(params: EmployeeParams): Promise<Employee> {
    const resp = (await this._actor.createEmployee(
      params.toDto(),
    )) as EmployeeDto;

    return Employee.fromDto(resp);
  }

  async readEmployee(id: number): Promise<Employee> {
    const resp = (await this._actor.readEmployee(id)) as EmployeeDto;

    return Employee.fromDto(resp);
  }

  async readAllEmployees(): Promise<Employee[]> {
    const resp = (await this._actor.readAllEmployees()) as EmployeeDto[];

    return resp.map((e) => Employee.fromDto(e));
  }

  async updateEmployee(id: number, params: EmployeeParams): Promise<Employee> {
    const resp = (await this._actor.updateEmployee(
      id,
      params.toDto(),
    )) as EmployeeDto;

    return Employee.fromDto(resp);
  }

  async deleteEmployee(id: number): Promise<void> {
    await this._actor.deleteEmployee(id);
  }
}

export default EmployeeDriver;
