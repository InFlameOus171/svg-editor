import { FooterFields } from '../../../components/molecules/FooterFields';
import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { Tool } from '../Tool';
export declare class SelectTool extends Tool<ShapeType> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: EditorTemplate, onSelect: (shape: ShapeType | ShapeType[] | null) => void, shapes: ShapeType[], offset?: Coordinates, footerFields?: FooterFields);
    updateAllShapes: (shapes?: ShapeType[]) => void;
    updatePreview: () => void;
    changeStyle: (config: SVGParamsBase) => void;
    executeAction: () => void;
    destroy: () => void;
}
