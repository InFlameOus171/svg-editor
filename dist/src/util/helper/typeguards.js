import { Tools_List } from './constants';
export const isEllipse = (shape) => {
    return shape['toSVGEllipseParams'] !== undefined;
};
export const isRectangle = (shape) => {
    return shape['toSvgRectParams'] !== undefined;
};
export const isLine = (shape) => {
    return shape['toSVGLineParams'] !== undefined;
};
export const isFreehand = (shape) => {
    return shape['toSVGFreehandParams'] !== undefined;
};
export const isPath = (shape) => {
    return shape['toSVGPathParams'] !== undefined;
};
export const isText = (shape) => {
    return shape['toSVGTextParams'] !== undefined;
};
export const isShapeType = (shape) => {
    return (!!shape && shape['getDeconstructedShapeData'] !== undefined);
};
export const typeOfShape = (shape) => {
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
export const isTextTool = (tool) => {
    return !!tool && tool['updateText'] !== undefined;
};
export const isSelectTool = (tool) => {
    return (!!tool &&
        tool['toolName'] !== undefined &&
        tool.toolName === Tools_List.SELECT);
};
export const isMoveTool = (tool) => {
    return (!!tool &&
        tool['toolName'] !== undefined &&
        tool.toolName === Tools_List.MOVE);
};
//# sourceMappingURL=typeguards.js.map