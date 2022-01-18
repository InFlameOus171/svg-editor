import { FooterFields } from '.';
import { SVGParamsBase } from '../../../types/types';
import { SVGParamFieldID } from '../../../util/helper/constants';
export declare const updateNextSiblingValue: (event: InputEvent) => void;
export declare const updatePreviousSiblingValue: (event: InputEvent) => void;
export declare const inputFieldGetterGenerator: (fieldRoot?: HTMLElement | null | undefined) => (id: SVGParamFieldID) => HTMLInputElement | null;
export declare const updateStyleInputFields: (inputFieldRef: FooterFields, params: SVGParamsBase) => void;
