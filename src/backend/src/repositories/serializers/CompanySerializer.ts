import { Serializable } from "azle";
import { Company } from "models";
import EmployeeService from "../../services/EmployeeService";

export function CompanySerializer(): Serializable {
    return {
        toBytes: (data: Company): Uint8Array => {
            const result = JSON.stringify(data.toPersistence());
            return Uint8Array.from(Buffer.from(result));
        },
        fromBytes: (bytes: Uint8Array): Company => {
            return Company.fromPersistence(JSON.parse(Buffer.from(bytes).toString()), EmployeeService.instance);
        }
    }
}