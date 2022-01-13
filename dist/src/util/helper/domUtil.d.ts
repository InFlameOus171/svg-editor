import { SVGEditor } from '../../components/organisms/SVGEditor';
import type { SVGParamsBase } from '../../types/types';
import { SVGParamFieldID, Tools_List } from './constants';
export declare const inputFieldGetterGenerator: (fieldRoot?: HTMLElement | null | undefined) => (id: SVGParamFieldID) => HTMLInputElement | null;
export declare const updateStyleInputFields: (self: SVGEditor, params: SVGParamsBase) => void;
export declare const getToolButton: (editor: SVGEditor, tool: Tools_List) => HTMLElement | null | undefined;
export declare const setIsButtonActive: (editor: SVGEditor, tool: Tools_List, isActive?: boolean) => void;
export declare const setIsButtonDisabled: (editor: SVGEditor, tool: Tools_List, isDisabled?: boolean) => void;
export declare const handleUpdateSVGParameters: (target: SVGEditor) => void;
export declare const getElementValueByIdGenerator: (shadowRoot?: ShadowRoot | null | undefined) => (id: SVGParamFieldID) => string | undefined;
export declare const measureText: (text: string, params: SVGParamsBase, layer?: HTMLCanvasElement | null | undefined, measureContext?: CanvasRenderingContext2D | null | undefined) => {
    width: number;
    height: number;
} | undefined;
