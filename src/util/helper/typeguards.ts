import { Shapes, ShapeType, ToolType } from '../../types/shapes';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Path } from '../Shapes/Path';
import { Rectangle } from '../Shapes/Rectangle';
import { TextShape } from '../Shapes/Text';
import { TextTool } from '../Tools/TextTool';

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
