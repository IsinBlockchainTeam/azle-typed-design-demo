import { AzleDto } from './AzleDto';

export enum VisibilityLevel {
    RESTRICTED = 'RESTRICTED',
    FULL = 'FULL'
}

export abstract class VisibilityLayer {
    visibilityLevel: VisibilityLevel;

    constructor(visibilityLevel: VisibilityLevel) {
        this.visibilityLevel = visibilityLevel;
    }
}

export type VisibilityLayerDto = {
    visibilityLevel: VisibilityLevel;
}

export interface RestrictedVisibility<T extends AzleDto<any>> {
    toRestricted(...args: any[]): T;
}

export interface FullVisibility<T extends AzleDto<any>> {
    toFull(...args: any[]): T;
}
