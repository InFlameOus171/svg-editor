import type { SVGParamsBase } from '../../types/types';
export declare const acceptedTags: string[];
export declare const highlightStyle: SVGParamsBase;
export declare const textPlaceHolder: string;
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
export declare enum Tools_List {
    DRAW = "draw-tool",
    LINE = "line-tool",
    RECT = "rect-tool",
    ELLIPSE = "ellipse-tool",
    SELECT = "select-tool",
    TEXT = "text-tool",
    MOVE = "move-tool",
    DELETE = "delete-tool",
    UNSELECT = "unselect-tool"
}
export declare enum SVGParamFieldID {
    TEXT_FONT_FAMILY = "text-font-family-input",
    TEXT_FONT_SIZE = "text-font-size-input",
    TEXT = "text-input",
    STROKE_WIDTH = "stroke-width-input",
    STROKE_COLOR = "stroke-color-input",
    STROKE_OPACITY = "stroke-opacity-input",
    FILL_COLOR = "fill-color-input",
    FILL_OPACITY = "fill-opacity-input",
    LINE_CAP = "line-cap-input",
    LINE_DASH = "line-dash-input"
}
