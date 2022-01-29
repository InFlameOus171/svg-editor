export const acceptedTags = [
    'circle',
    'ellipse',
    'rect',
    'polyline',
    'line',
    'text',
    'path',
];
export const highlightStyle = {
    stroke: 'rgba(255,0,0,.4)',
    lineDash: [12],
    strokeWidth: '5',
};
export const textPlaceHolder = 'Input text...';
/**
   DRAW
  LINE
  RECT
  ELLIPSE
  SELECT
  TEXT
  MOVE
  DELETE
  UNSELECT
*/
export var Tools_List;
(function (Tools_List) {
    Tools_List["DRAW"] = "draw-tool";
    Tools_List["LINE"] = "line-tool";
    Tools_List["RECT"] = "rect-tool";
    Tools_List["ELLIPSE"] = "ellipse-tool";
    Tools_List["SELECT"] = "select-tool";
    Tools_List["TEXT"] = "text-tool";
    Tools_List["MOVE"] = "move-tool";
    Tools_List["DELETE"] = "delete-tool";
    Tools_List["UNSELECT"] = "unselect-tool";
})(Tools_List || (Tools_List = {}));
export var SVGParamFieldID;
(function (SVGParamFieldID) {
    SVGParamFieldID["TEXT_FONT_FAMILY"] = "text-font-family-input";
    SVGParamFieldID["TEXT_FONT_SIZE"] = "text-font-size-input";
    SVGParamFieldID["TEXT"] = "text-input";
    SVGParamFieldID["STROKE_WIDTH"] = "stroke-width-input";
    SVGParamFieldID["STROKE_COLOR"] = "stroke-color-input";
    SVGParamFieldID["STROKE_OPACITY"] = "stroke-opacity-input";
    SVGParamFieldID["FILL_COLOR"] = "fill-color-input";
    SVGParamFieldID["FILL_OPACITY"] = "fill-opacity-input";
    SVGParamFieldID["LINE_CAP"] = "line-cap-input";
    SVGParamFieldID["LINE_DASH"] = "line-dash-input";
})(SVGParamFieldID || (SVGParamFieldID = {}));
//# sourceMappingURL=constants.js.map