import { FooterFields } from '../../../components/molecules/FooterFields';
import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { Tool } from '../Tool';
export declare class MoveTool extends Tool<ShapeType> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: EditorTemplate, onMove: (shape: ShapeType | ShapeType[] | null) => void, offset: Coordinates, selectedShape: ShapeType, footerFields: FooterFields);
    updatePreview: () => void;
    changeStyle: (config: SVGParamsBase) => void;
    executeAction: () => void;
    destroy: () => void;
}
