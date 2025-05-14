import { Serializable } from "azle";
import { Employee } from "models";

export function EmployeeSerializer(): Serializable {
    return {
        toBytes: (data: Employee): Uint8Array => {
            const result = JSON.stringify(data.toPersistence());
            return Uint8Array.from(Buffer.from(result));
        },
        fromBytes: (bytes: Uint8Array): Employee => {
            return Employee.fromPersistence(JSON.parse(Buffer.from(bytes).toString()));
        }
    }
}