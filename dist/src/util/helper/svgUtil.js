import { Ellipse } from '../shapes/Ellipse/Ellipse';
import { Freehand } from '../shapes/Freehand/Freehand';
import { Line } from '../shapes/Line/Line';
import { Path } from '../shapes/Path/Path';
import { Rectangle } from '../shapes/Rectangle/Rectangle';
import { TextShape } from '../shapes/Text/Text';
import { acceptedTags } from './constants';
import { getMinMaxValuesOfCoordinates } from './coordinates';
import { pathCommandsRegExp } from './regularExpressions';
import { typeOfShape } from './typeguards';
import { hexToRGBA, normalizeColorCode, pathCommandValues, singleDirectionCommands, } from './util';
export const setSVGStyleParams = (svgShape, lineDash, lineCap, fill, stroke, strokeWidth, transformMatrix) => {
    const { a, b, c, d, e, f } = transformMatrix || {};
    stroke && svgShape.setAttribute('stroke', stroke);
    strokeWidth && svgShape.setAttribute('stroke-width', strokeWidth);
    fill && svgShape.setAttribute('fill', fill);
    lineDash && svgShape.setAttribute('stroke-dasharray', lineDash.join(' '));
    lineCap && svgShape.setAttribute('stroke-linecap', lineCap);
    transformMatrix &&
        svgShape.setAttribute('transform', `matrix(${[a, b, c, d, e, f].join(',')})`);
};
export const setRectSVGParams = (svgShape, rectParams) => {
    const { x, y, width, height, fill, stroke, strokeWidth, lineDash, lineCap } = rectParams;
    svgShape.setAttribute('x', x);
    svgShape.setAttribute('y', y);
    svgShape.setAttribute('width', width);
    svgShape.setAttribute('height', height);
    setSVGStyleParams(svgShape, lineDash, lineCap, fill, stroke, strokeWidth);
};
export const setEllipseSVGParams = (svgShape, ellipseParams) => {
    const { cx, cy, rx, ry, fill, stroke, strokeWidth, lineDash, lineCap } = ellipseParams;
    svgShape.setAttribute('cx', cx);
    svgShape.setAttribute('cy', cy);
    svgShape.setAttribute('rx', rx);
    svgShape.setAttribute('ry', ry);
    setSVGStyleParams(svgShape, lineDash, lineCap, fill, stroke, strokeWidth);
};
export const setCircleSVGParams = (svgShape, circleParams) => {
    const { cx, cy, rx, fill, stroke, strokeWidth, lineDash, lineCap } = circleParams;
    svgShape.setAttribute('cx', cx);
    svgShape.setAttribute('cy', cy);
    svgShape.setAttribute('r', rx);
    setSVGStyleParams(svgShape, lineDash, lineCap, fill, stroke, strokeWidth);
};
export const setLineSVGParams = (svgShape, lineParams) => {
    const { x1, y1, x2, y2, stroke, strokeWidth, lineDash, lineCap } = lineParams;
    svgShape.setAttribute('x1', x1);
    svgShape.setAttribute('y1', y1);
    svgShape.setAttribute('x2', x2);
    svgShape.setAttribute('y2', y2);
    setSVGStyleParams(svgShape, lineDash, lineCap, undefined, stroke, strokeWidth);
};
export const setFreehandSVGParams = (svgShape, freehandParams) => {
    const { points, stroke, strokeWidth, lineDash, lineCap } = freehandParams;
    svgShape.setAttribute('points', points);
    setSVGStyleParams(svgShape, lineDash, lineCap, undefined, stroke, strokeWidth);
};
export const setPathSVGParams = (svgShape, svgParams) => {
    const { d, fill, stroke, strokeWidth, transformMatrix, lineDash, lineCap } = svgParams;
    svgShape.setAttribute('d', d);
    setSVGStyleParams(svgShape, lineDash, lineCap, fill, stroke, strokeWidth, transformMatrix);
};
export const setTextSVGParams = (svgShape, textObject) => {
    const svgParams = textObject.toSVGTextParams();
    const { position, lineDash, lineCap, fill, stroke, strokeWidth, transformMatrix = new DOMMatrix([1, 0, 0, 1, 0, 0]), fontFamily, fontSize, text, } = svgParams;
    if (text) {
        svgShape.setAttribute('x', position[0].toString());
        svgShape.setAttribute('y', position[1].toString());
        svgShape.setAttribute('style', 'font-family:'.concat(fontFamily !== null && fontFamily !== void 0 ? fontFamily : 'arial', ';', 'font-size:', (fontSize !== null && fontSize !== void 0 ? fontSize : 12).toString(), 'px'));
        svgShape.innerHTML = text;
        setSVGStyleParams(svgShape, lineDash, lineCap, fill, stroke, strokeWidth, transformMatrix);
    }
};
export const appendAsSVGShapeGeneratorFunction = (parent, svgNameSpace = null) => (shape) => {
    switch (typeOfShape(shape)) {
        case 'Rectangle': {
            const rectangleObject = shape;
            const rect = document.createElementNS(svgNameSpace, 'rect');
            setRectSVGParams(rect, rectangleObject.toSvgRectParams());
            parent === null || parent === void 0 ? void 0 : parent.appendChild(rect);
            break;
        }
        case 'Ellipse': {
            const ellipseObject = shape;
            const isCircle = ellipseObject.radiusX === ellipseObject.radiusY;
            if (isCircle) {
                const circle = document.createElementNS(svgNameSpace, 'circle');
                setCircleSVGParams(circle, ellipseObject.toSVGEllipseParams());
                parent === null || parent === void 0 ? void 0 : parent.appendChild(circle);
            }
            else {
                const ellipse = document.createElementNS(svgNameSpace, 'ellipse');
                setEllipseSVGParams(ellipse, ellipseObject.toSVGEllipseParams());
                parent === null || parent === void 0 ? void 0 : parent.appendChild(ellipse);
            }
            break;
        }
        case 'Line': {
            const lineObject = shape;
            const line = document.createElementNS(svgNameSpace, 'line');
            setLineSVGParams(line, lineObject.toSVGLineParams());
            parent === null || parent === void 0 ? void 0 : parent.appendChild(line);
            break;
        }
        case 'Freehand': {
            const freehandObject = shape;
            const freehand = document.createElementNS(svgNameSpace, 'polyline');
            setFreehandSVGParams(freehand, freehandObject.toSVGFreehandParams());
            parent === null || parent === void 0 ? void 0 : parent.appendChild(freehand);
            break;
        }
        case 'Path': {
            const pathObject = shape;
            const path = document.createElementNS(svgNameSpace, 'path');
            setPathSVGParams(path, pathObject.toSVGPathParams());
            parent === null || parent === void 0 ? void 0 : parent.append(path);
            break;
        }
        case 'TextShape': {
            const textObject = shape;
            const text = document.createElementNS(svgNameSpace, 'text');
            setTextSVGParams(text, textObject);
            parent === null || parent === void 0 ? void 0 : parent.append(text);
            break;
        }
    }
};
export const convertMatchesToSVGDrawPath = (match) => {
    const command = match[0].trim();
    const matchedCoordinates = match.slice(1);
    if (singleDirectionCommands.includes(command)) {
        return { command, points: matchedCoordinates.shift() };
    }
    const points = matchedCoordinates.reduce((acc, point, index) => {
        if (index % 2 === 0) {
            return acc;
        }
        const coordinates = [
            parseFloat(matchedCoordinates[index - 1]),
            parseFloat(point),
        ];
        return [...acc, coordinates];
    }, []);
    return { command, points };
};
export const getPathCommands = (d) => {
    const matches = Array.from(d.matchAll(pathCommandsRegExp)).map(match => match[0]);
    const indices = matches.reduce((acc, match, index) => {
        if (pathCommandValues.includes(match)) {
            return [...acc, index];
        }
        return acc;
    }, []);
    const segments = indices.reduce((acc, commandIndex, currentIndex) => {
        if (currentIndex === indices.length - 1) {
            return [...acc, matches.slice(commandIndex)];
        }
        return [...acc, matches.slice(commandIndex, indices[currentIndex + 1])];
    }, []);
    return segments.map(convertMatchesToSVGDrawPath);
};
export const generateSVGURLFromShapes = (shapes) => {
    const xmlSerializer = new XMLSerializer();
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const g = document.createElementNS(svgNS, 'g');
    const [allBoundaryCoordinates, allStrokeWidths] = shapes.reduce((acc, shape) => {
        var _a;
        return [
            [...acc[0], ...shape.boundaries],
            [...acc[1], parseInt((_a = shape.getSvgParams().strokeWidth) !== null && _a !== void 0 ? _a : '0')],
        ];
    }, [[], []]);
    const minMaxCoordinates = getMinMaxValuesOfCoordinates(allBoundaryCoordinates);
    const maxStrokeWidth = Math.max(...allStrokeWidths);
    const verticalOffset = minMaxCoordinates.yMin - maxStrokeWidth;
    const horizontalOffset = minMaxCoordinates.xMin - maxStrokeWidth;
    svg.setAttribute('height', (minMaxCoordinates.yMax - verticalOffset).toString());
    svg.setAttribute('width', (minMaxCoordinates.xMax - horizontalOffset).toString());
    g.setAttribute('transform', 'translate(' + -minMaxCoordinates.xMin + ',' + -minMaxCoordinates.yMin + ')');
    svg.appendChild(g);
    const appendAsSVGShape = appendAsSVGShapeGeneratorFunction(g, svgNS);
    shapes.forEach(appendAsSVGShape);
    let source = xmlSerializer.serializeToString(svg);
    //add name spaces.
    //https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
};
export const getSVGParamsFromSVG = (element) => {
    var _a, _b, _c;
    const fillValues = normalizeColorCode(element.getAttribute('fill'));
    const strokeValues = normalizeColorCode(element.getAttribute('stroke'));
    const fill = hexToRGBA(fillValues.colorCode, fillValues.opacity);
    const stroke = hexToRGBA(strokeValues.colorCode, strokeValues.opacity);
    const strokeWidth = (_a = element.getAttribute('stroke-width')) !== null && _a !== void 0 ? _a : '';
    const transformMatrix = (_b = element.getCTM()) !== null && _b !== void 0 ? _b : undefined;
    const fontSize = element.style.fontSize;
    const fontFamily = element.style.fontFamily;
    const lineDash = (_c = element
        .getAttribute('stroke-dasharray')) === null || _c === void 0 ? void 0 : _c.split(' ').map(parseInt);
    const lineCap = element.getAttribute('line-cap');
    const text = element.tagName === 'text' ? element.innerHTML : '';
    const bBox = element.getBBox();
    return {
        fill,
        stroke,
        strokeWidth,
        text,
        fontSize: fontSize ? parseInt(fontSize) : undefined,
        fontFamily,
        transformMatrix,
        lineDash,
        lineCap,
        bBox,
    };
};
const elementWrapper = (element) => {
    return {
        getFloatAttribute: (value) => {
            const attr = element.getAttribute(value);
            if (attr) {
                return parseFloat(attr);
            }
            else
                return -1;
        },
        getAttribute: element.getAttribute,
    };
};
const convertToShapeType = (element) => {
    var _a, _b;
    const svgParams = getSVGParamsFromSVG(element);
    const wrappedElement = elementWrapper(element);
    switch (element.tagName) {
        case acceptedTags[0]: {
            const cx = wrappedElement.getFloatAttribute('cx');
            const cy = wrappedElement.getFloatAttribute('cy');
            const r = wrappedElement.getFloatAttribute('r');
            return new Ellipse([cx, cy], r, r, svgParams);
        }
        case acceptedTags[1]: {
            {
                const cx = wrappedElement.getFloatAttribute('cx');
                const cy = wrappedElement.getFloatAttribute('cy');
                const rx = wrappedElement.getFloatAttribute('rx');
                const ry = wrappedElement.getFloatAttribute('ry');
                return new Ellipse([cx, cy], rx, ry, svgParams);
            }
        }
        case acceptedTags[2]: {
            {
                const x = wrappedElement.getFloatAttribute('x');
                const y = wrappedElement.getFloatAttribute('y');
                const width = wrappedElement.getFloatAttribute('width');
                const height = wrappedElement.getFloatAttribute('height');
                return new Rectangle([x, y], width, height, svgParams);
            }
        }
        case acceptedTags[3]: {
            {
                const points = ((_a = wrappedElement.getAttribute('points')) !== null && _a !== void 0 ? _a : '')
                    .split(' ')
                    .map((coordinate) => {
                    const [x, y] = coordinate.split(',');
                    return [parseFloat(x), parseFloat(y)];
                });
                return new Freehand(points, svgParams);
            }
        }
        case acceptedTags[4]: {
            {
                const x1 = wrappedElement.getFloatAttribute('x1');
                const x2 = wrappedElement.getFloatAttribute('x2');
                const y1 = wrappedElement.getFloatAttribute('y1');
                const y2 = wrappedElement.getFloatAttribute('y2');
                return new Line([x1, y1], [x2, y2], svgParams);
            }
        }
        case acceptedTags[5]: {
            const x = wrappedElement.getFloatAttribute('x');
            const y = wrappedElement.getFloatAttribute('y');
            const { width, height } = element.getBBox();
            return new TextShape(width, height, [x, y], svgParams);
        }
        default: {
            const pathDString = (_b = wrappedElement.getAttribute('d')) !== null && _b !== void 0 ? _b : '';
            const pathCommands = getPathCommands(pathDString);
            return new Path(pathCommands, svgParams, true);
        }
    }
};
export const convertSVGDocumentToShapes = (id) => {
    const svg = document.getElementById(id);
    if (svg) {
        return acceptedTags
            .map(tag => Array.from(svg.getElementsByTagName(tag)).map(convertToShapeType))
            .flat();
    }
    return [];
};
//# sourceMappingURL=svgUtil.js.map