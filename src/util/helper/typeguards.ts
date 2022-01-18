import type { Shapes, ShapeType } from '../../types/shapes.types';
import type { Ellipse } from '../shapes/Ellipse/Ellipse';
import type { Freehand } from '../shapes/Freehand/Freehand';
import type { Line } from '../shapes/Line/Line';
import type { Path } from '../shapes/Path/Path';
import type { Rectangle } from '../shapes/Rectangle/Rectangle';
import type { TextShape } from '../shapes/Text/Text';
import type { MoveTool } from '../tools/MoveTool/MoveTool';
import type { SelectTool } from '../tools/SelectTool/SelectTool';
import type { TextTool } from '../tools/TextTool/TextTool';
import { Tools_List } from './constants';

export const isEllipse = (shape: ShapeType): shape is Ellipse => {
  return (shape as Ellipse)['toSVGEllipseParams'] !== undefined;
};

export const isRectangle = (shape: ShapeType): shape is Rectangle => {
  return (shape as Rectangle)['toSvgRectParams'] !== undefined;
};

export const isLine = (shape: ShapeType): shape is Line => {
  return (shape as Line)['toSVGLineParams'] !== undefined;
};

export const isFreehand = (shape: ShapeType): shape is Freehand => {
  return (shape as Freehand)['toSVGFreehandParams'] !== undefined;
};
export const isPath = (shape: ShapeType): shape is Path => {
  return (shape as Path)['toSVGPathParams'] !== undefined;
};
export const isText = (shape: ShapeType): shape is TextShape => {
  return (shape as TextShape)['toSVGTextParams'] !== undefined;
};

export const isShapeType = (shape: unknown): shape is ShapeType => {
  return (
    !!shape && (shape as ShapeType)['getDeconstructedShapeData'] !== undefined
  );
};

export const typeOfShape = (shape: ShapeType): Shapes => {
  if (isRectangle(shape)) {
    return 'Rectangle';
  }
  if (isEllipse(shape)) {
    return 'Ellipse';
  }
  if (isLine(shape)) {
    return 'Line';
  }
  if (isPath(shape)) {
    return 'Path';
  }
  if (isText(shape)) {
    return 'TextShape';
  }
  return 'Freehand';
};

export const isTextTool = (tool?: any): tool is TextTool => {
  return !!tool && (tool as TextTool)['updateText'] !== undefined;
};

export const isSelectTool = (tool?: any): tool is SelectTool => {
  return (
    !!tool &&
    (tool as SelectTool)['toolName'] !== undefined &&
    (tool as SelectTool).toolName === Tools_List.SELECT
  );
};

export const isMoveTool = (tool?: any): tool is MoveTool => {
  return (
    !!tool &&
    (tool as MoveTool)['toolName'] !== undefined &&
    (tool as MoveTool).toolName === Tools_List.MOVE
  );
};
