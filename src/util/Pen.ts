import { SupportedStyle, SupportedStyles } from '../types/globalStyles.types';
import { ShapeType } from '../types/shapes';
import { SVGParamsBase } from '../types/types';
import { decimalNumberRegExpGlobal } from './constants/regularExpressions';
import {
  canvasRenderingContextStylesMap,
  CanvasRenderingContextStylesTypes,
} from './constants/styles';
import { typeOfShape } from './helper/typeguards';
import { Ellipse } from './Shapes/Ellipse';
import { Freehand } from './Shapes/Freehand';
import { Line } from './Shapes/Line';
import { Path } from './Shapes/Path';
import { Rectangle } from './Shapes/Rectangle';

const Pen = {
  generatePen: (context?: CanvasRenderingContext2D) => {
    return {
      draw: (shape: ShapeType, svgParams?: SVGParamsBase) => {
        const shapeType = typeOfShape(shape);
        switch (shapeType) {
          case 'Ellipse':
            Pen.drawEllipse(shape as Ellipse, context, svgParams);
            break;
          case 'Rectangle':
            Pen.drawRectangle(shape as Rectangle, context, svgParams);
            break;
          case 'Line':
            Pen.drawLine(shape as Line, context, svgParams);
            break;
          case 'Freehand':
            Pen.drawFreehand(shape as Freehand, context, svgParams);
            break;
          case 'Path':
            Pen.drawPath(shape as Path, context, svgParams);
        }
      },
    };
  },

  applyStyles: (context: CanvasRenderingContext2D, styles: SupportedStyles) => {
    if (styles['fill']) {
      if (styles['fill'] === 'none') {
        context.fillStyle = 'transparent';
      } else {
        context.fillStyle = styles.fill;
      }
    }
    if (styles['stroke']) {
      if (styles['stroke'] === 'none') {
        context.strokeStyle = 'transparent';
      } else {
        context.strokeStyle = styles.stroke;
      }
    }
    if (styles['stroke-width']) {
      context.lineWidth = parseFloat(styles['stroke-width']);
    }
    if (styles['stroke-linecap']) {
      context.lineCap = styles['stroke-linecap'] as CanvasLineCap;
    }
    if (styles['stroke-linejoin']) {
      context.lineJoin = styles['stroke-linejoin'] as CanvasLineJoin;
    }
    if (styles['stroke-miterlimit']) {
      context.miterLimit = parseFloat(styles['stroke-miterlimit'] ?? '4');
    }
  },

  drawPath: (
    path: Path,
    context?: CanvasRenderingContext2D,
    svgParams?: SVGParamsBase
  ) => {
    if (!context) {
      return;
    }
    let pathConstructor = new Path2D();

    const allSVGParams = { ...path.styles, ...svgParams };
    const { transformMatrix, ...rest } = allSVGParams;
    const { styles } = (rest as { styles: SupportedStyles }) || {};
    const cleanedUpStyles = Object.fromEntries(
      Object.entries(styles).filter(([key, value]) => !!value)
    );

    pathConstructor.addPath(new Path2D(path.toString()));
    cleanedUpStyles && Pen.applyStyles(context, cleanedUpStyles);

    if (transformMatrix) {
      const temporaryPath = new Path2D();
      temporaryPath.addPath(pathConstructor, transformMatrix);
      pathConstructor = temporaryPath;
    }
    context.fill(
      pathConstructor,
      cleanedUpStyles['fill-rule'] as CanvasFillRule | undefined
    );
    cleanedUpStyles['clip-rule'] &&
      context.clip(
        pathConstructor,
        cleanedUpStyles['clip-rule'] as CanvasFillRule | undefined
      );
    context.stroke(pathConstructor);
  },

  drawFreehand: (
    freehand: Freehand,
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    if (!context) {
      return;
    }
    let pathConstructor = new Path2D();
    const points = freehand.getPoints();
    const start = points[0];
    const rest = points.slice(1);
    const allSVGParams = {
      ...freehand.styles,
      ...svgParams,
    };
    const { transformMatrix, ...restParams } = allSVGParams;
    const { styles } = (restParams as { styles: SupportedStyles }) || {};
    const cleanedUpStyles = Object.fromEntries(
      Object.entries(styles).filter(([key, value]) => !!value)
    );
    if (transformMatrix) {
      const temporaryPath = new Path2D();
      temporaryPath.addPath(pathConstructor, transformMatrix);
      pathConstructor = temporaryPath;
    }
    cleanedUpStyles && Pen.applyStyles(context, cleanedUpStyles);
    pathConstructor.moveTo(...start);
    rest.forEach(point => {
      pathConstructor.lineTo(...point);
    });

    context.fill(
      pathConstructor,
      cleanedUpStyles['fill-rule'] as CanvasFillRule | undefined
    );
    context.clip(
      pathConstructor,
      cleanedUpStyles['clip-rule'] as CanvasFillRule | undefined
    );
    context.stroke(pathConstructor);
    context?.closePath();
  },

  drawLine: (
    line: Line,
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    if (!context) {
      return;
    }
    const allSVGParams = {
      ...line.styles,
      ...svgParams,
    };
    const { transformMatrix, ...rest } = allSVGParams;
    const { styles } = (rest as { styles: SupportedStyles }) || {};
    const cleanedUpStyles = Object.fromEntries(
      Object.entries(styles).filter(([key, value]) => !!value)
    );
    let pathConstructor = new Path2D();
    if (transformMatrix) {
      const temporaryPath = new Path2D();
      temporaryPath.addPath(pathConstructor, transformMatrix);
      pathConstructor = temporaryPath;
    }
    cleanedUpStyles && Pen.applyStyles(context, cleanedUpStyles);
    pathConstructor.moveTo(...line.points[0]);
    pathConstructor.lineTo(...line.points[1]);

    context.fill(
      pathConstructor,
      cleanedUpStyles['fill-rule'] as CanvasFillRule | undefined
    );
    context.clip(
      pathConstructor,
      cleanedUpStyles['clip-rule'] as CanvasFillRule | undefined
    );
    context.stroke(pathConstructor);
    context?.closePath();
  },

  drawRectangle: (
    rectangle: Rectangle,
    context?: CanvasRenderingContext2D,
    svgParams?: SVGParamsBase
  ) => {
    if (!context) {
      return;
    }
    let pathConstructor = new Path2D();

    const allSVGParams = { ...rectangle.styles, ...svgParams };
    const { transformMatrix, ...rest } = allSVGParams;
    const { styles } = (rest as { styles: SupportedStyles }) || {};
    const cleanedUpStyles = styles
      ? Object.fromEntries(
          Object.entries(styles).filter(([key, value]) => !!value)
        )
      : rest;
    if (transformMatrix) {
      const temporaryPath = new Path2D();
      temporaryPath.addPath(pathConstructor, transformMatrix);
      pathConstructor = temporaryPath;
    }
    const values = Object.values(rectangle.toPathParams()) as [
      number,
      number,
      number,
      number
    ];
    pathConstructor.rect(...values);
    cleanedUpStyles && Pen.applyStyles(context, cleanedUpStyles);
    context.fill(
      pathConstructor,
      cleanedUpStyles['fill-rule'] as CanvasFillRule | undefined
    );
    context.clip(
      pathConstructor,
      cleanedUpStyles['clip-rule'] as CanvasFillRule | undefined
    );
    context.stroke(pathConstructor);
    context?.closePath();
  },

  drawEllipse: (
    ellipse: Ellipse,
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    if (!context) {
      return;
    }
    let pathConstructor = new Path2D();

    const allSVGParams = {
      ...ellipse.styles,
      ...svgParams,
    };
    const { transformMatrix, ...rest } = allSVGParams;
    const { styles } = (rest as { styles: SupportedStyles }) || {};
    const cleanedUpStyles = Object.fromEntries(
      Object.entries(styles).filter(([key, value]) => !!value)
    );
    if (transformMatrix) {
      const temporaryPath = new Path2D();
      temporaryPath.addPath(pathConstructor, transformMatrix);
      pathConstructor = temporaryPath;
    }
    const values = Object.values(ellipse.toPathParams()) as [
      number,
      number,
      number,
      number
    ];
    pathConstructor.ellipse(...values, 0, 0, 2 * Math.PI);
    cleanedUpStyles && Pen.applyStyles(context, cleanedUpStyles);
    context.fill(
      pathConstructor,
      cleanedUpStyles['fill-rule'] as CanvasFillRule | undefined
    );
    context.clip(
      pathConstructor,
      cleanedUpStyles['clip-rule'] as CanvasFillRule | undefined
    );
    context.stroke(pathConstructor);
    context?.closePath();
  },

  clearCanvas: (
    canvas: HTMLCanvasElement,
    canvasContext: CanvasRenderingContext2D
  ) => {
    if (canvas) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
  },
};
Object.freeze(Pen);
export { Pen };
