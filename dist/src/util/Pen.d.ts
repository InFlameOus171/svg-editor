import type { ShapeType } from '../types/typeGuards.types';
import type { SVGParamsBase } from '../types/types';
import { Ellipse } from './shapes/Ellipse/Ellipse';
import { Freehand } from './shapes/Freehand/Freehand';
import { Line } from './shapes/Line/Line';
import { Path } from './shapes/Path/Path';
import { Rectangle } from './shapes/Rectangle/Rectangle';
import { TextShape } from './shapes/Text/Text';
declare const Pen: {
    readonly draw: (shape: ShapeType, svgParams: Partial<SVGParamsBase> | undefined, context: CanvasRenderingContext2D) => void;
    readonly setStyles: (pathConstructor: Path2D, styles: SVGParamsBase, context: CanvasRenderingContext2D) => Path2D;
    readonly drawPath: (path: Path, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    readonly drawText: (textShape: TextShape, context?: CanvasRenderingContext2D | null | undefined, svgParams?: SVGParamsBase | undefined) => void;
    readonly drawFreehand: (freehand: Freehand, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    readonly drawLine: (line: Line, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    readonly drawRectangle: (rectangle: Rectangle, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    readonly drawEllipse: (ellipse: Ellipse, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    readonly clearCanvas: (canvas: HTMLCanvasElement, canvasContext?: CanvasRenderingContext2D | null | undefined) => void;
};
export { Pen };
