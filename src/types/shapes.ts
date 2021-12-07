import { Ellipse } from '../util/Shapes/Ellipse';
import { Freehand } from '../util/Shapes/Freehand';
import { Line } from '../util/Shapes/Line';
import { Rectangle } from '../util/Shapes/Rectangle';

export type Shape = Ellipse | Rectangle | Line | Freehand;
export type Shapes = 'Ellipse' | 'Rectangle' | 'Line' | 'Freehand';
