import { FooterFields } from '../../../components/molecules/FooterFields';
import { SVGEditor } from '../../../components/organisms/SVGEditor';
import type { ShapeType } from '../../../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { Tool } from '../Tool';
export declare class SelectTool extends Tool<ShapeType> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: SVGEditor, onSelect: (shape: ShapeType | ShapeType[] | null) => void, shapes: ShapeType[], offset?: Coordinates, footerFields?: FooterFields);
    updateAllShapes: (shapes?: ShapeType[]) => void;
    updatePreview: () => void;
    changeStyle: (config: SVGParamsBase) => void;
    executeAction: () => void;
    destroy: () => void;
}
