import { ErrorType } from "./ErrorType";

export class EnumKeyNotFoundError extends Error {
    constructor(key: string, enumType: Record<string, string | number>) {
        super(`Enum key ${key} not found in ${enumType}`);
        this.name = ErrorType.ENUM_KEY_NOT_FOUND;
    }
}