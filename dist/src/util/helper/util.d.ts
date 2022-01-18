import type { Coordinates } from '../../types/types';
export declare const getUniqueXandYCoordinatesFromBoundaries: (coordinates: Coordinates[]) => [number[], number[]];
export declare const arrayFrom: <T>(arrayLike?: ArrayLike<T>) => T[];
export declare const parseFloat: (value?: string | number | null | undefined) => number;
export declare const parseToFixed2HexString: (colorValue: RegExpMatchArray) => string;
export declare const hexToRGBA: (colorCode: string, opacity?: string) => string;
export declare const normalizeColorCode: (colorCode?: string | null | undefined) => {
    colorCode: string;
    opacity: string;
};
export declare const relativeCoordinatesCommands: string[];
export declare const absoluteCoordinatesCommands: string[];
export declare const relativeSingleDirectionCommands: string[];
export declare const absoluteSingleDirectionCommands: string[];
export declare const relativeCommands: (string | string[])[];
export declare const absoluteCommands: (string | string[])[];
export declare const singleDirectionCommands: string[];
export declare const pathCommandValues: string[];
