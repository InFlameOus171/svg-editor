import { Ellipse } from '../util/Shapes/Ellipse';
import { Freehand } from '../util/Shapes/Freehand';
import { Line } from '../util/Shapes/Line';
import { Rectangle } from '../util/Shapes/Rectangle';

export type ShapeType = Ellipse | Rectangle | Line | Freehand;
export type Shapes = 'Ellipse' | 'Rectangle' | 'Line' | 'Freehand';

export enum Tools_List {
  DRAW,
  LINE,
  RECT,
  ELLIPSE,
  SELECT,
  MOVE,
}
