import { EnumKeyNotFoundError } from "models";

export const getEnumValueByKey = <T extends Record<string, string | number>>(
    enumType: T,
    key: string
): T[keyof T] => {
    const enumKey = key.toUpperCase();

    if (enumKey in enumType) {
        return enumType[enumKey as keyof T];
    }

    throw new EnumKeyNotFoundError(key, enumType);
};
