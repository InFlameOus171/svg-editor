import { FooterFields } from '../components/molecules/FooterFields';
import { EditorTemplate } from '../components/templates/EditorTemplate';
import type { ShapeType } from '../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../types/types';
import { Tools_List } from './helper/constants';
import { Connection } from './network';
export declare class Editor {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, offset: Coordinates, self: EditorTemplate, footerFieldsRef: FooterFields);
    applyStyles: () => void;
    deleteFromShapes: (shapeIdData: string | string[]) => void;
    getAllShapes: () => ShapeType[];
    getSVGParams: () => SVGParamsBase;
    onUpdateStyleInputFields: () => void;
    onDeleteSelectedShape: () => void;
    onImportSVG: (data: Document) => void;
    onSave: () => void;
    onSelectTool: (tool: Tools_List | null) => void;
    onUnselectTool: () => void;
    redrawShapes: () => void;
    resetEditor: () => void;
    resetPreview: () => void;
    setConnection: (newConnection: Connection) => void;
    setShapeParam: (field: keyof SVGParamsBase, value: any) => void;
    setShapeParams: (fieldsUpdated?: boolean, strokeWidth?: string | undefined, stroke?: string, fill?: string, lineCap?: CanvasLineCap, lineDash?: number[], fontFamily?: string, fontSize?: number, text?: string | undefined) => void;
    updateShapes: (shapes: Array<Record<string, any>>) => void;
}
