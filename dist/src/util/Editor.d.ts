import { SVGEditor } from '../components/organisms/SVGEditor';
import type { ShapeType } from '../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../types/types';
import { Tools_List } from './helper/constants';
import { Connection } from './network';
export declare class Editor {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, offset: Coordinates, self: SVGEditor);
    getSVGParams: () => {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: string | undefined;
        lineDash?: number[] | undefined;
        lineCap?: CanvasLineCap | undefined;
        fontFamily?: string | undefined;
        fontSize?: number | undefined;
        transformMatrix?: DOMMatrix | undefined;
        text?: string | undefined;
        bBox?: DOMRect | undefined;
    };
    updateShapes: (shapes: Array<Record<string, any>>) => void;
    resetEditor: () => void;
    resetPreview: () => void;
    redrawShapes: () => void;
    onUpdateStyleInputFields: () => void;
    onSave: () => void;
    importSVG: (data: Document) => void;
    getAllShapes: () => ShapeType[];
    deleteFromShapes: (shapeIdData: string | string[]) => void;
    onDeleteSelectedShape: () => void;
    onSelectTool: (tool: Tools_List | null) => void;
    applyStyles: () => void;
    setShapeParam: (field: keyof SVGParamsBase, value: any) => void;
    setShapeParams: (fieldsUpdated?: boolean, strokeWidth?: string | undefined, stroke?: string, fill?: string, lineCap?: CanvasLineCap, lineDash?: number[], fontFamily?: string, fontSize?: number, text?: string | undefined) => void;
    setConnection: (newConnection: Connection) => void;
    onUnselectTool: () => void;
}
