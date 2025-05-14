import {
  CompanyFactory,
  CompanyParams,
  CompanyScoped,
  CompanyScopedDto,
} from "models";
import { createActor } from "../../../declarations/backend";
import { _SERVICE } from "../../../declarations/backend/backend.did";
import { ActorSubclass, Identity } from "@dfinity/agent";

export class CompanyDriver {
  private _actor: ActorSubclass<_SERVICE>;

  public constructor(icpIdentity: Identity, canisterId: string, host?: string) {
    this._actor = createActor(canisterId, {
      agentOptions: {
        identity: icpIdentity,
        ...(host && { host }),
      },
    });
  }

  async createCompany(params: CompanyParams): Promise<CompanyScoped> {
    const resp = (await this._actor.createCompany(
      params.toDto(),
    )) as CompanyScopedDto;

    return CompanyFactory.fromScopedDto(resp);
  }

  async readCompany(id: number): Promise<CompanyScoped> {
    const resp = (await this._actor.readCompany(id)) as CompanyScopedDto;

    return CompanyFactory.fromScopedDto(resp);
  }

  async readAllCompanies(): Promise<CompanyScoped[]> {
    const resp = (await this._actor.readAllCompanies()) as CompanyScopedDto[];

    return resp.map((c) => CompanyFactory.fromScopedDto(c));
  }

  async updateCompany(
    id: number,
    params: CompanyParams,
  ): Promise<CompanyScoped> {
    const resp = (await this._actor.updateCompany(
      id,
      params.toDto(),
    )) as CompanyScopedDto;

    return CompanyFactory.fromScopedDto(resp);
  }

  async deleteCompany(id: number): Promise<void> {
    await this._actor.deleteCompany(id);
  }
}

export default CompanyDriver;
