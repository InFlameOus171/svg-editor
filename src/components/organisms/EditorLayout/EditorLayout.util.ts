import { EditorLayout } from '.';
import { SVGParamFieldID, Tools_List } from '../../../util/helper/constants';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export const getToolboxButtonsProps = (
  selectToolFunction: (tool: Tools_List | null) => void
): IToolboxButtonProps[] => [
  {
    toolName: 'Draw Tool',
    class: 'draw-ool',
    onClick: () => selectToolFunction(Tools_List.DRAW),
    icon: 'public/images/draw.svg',
    id: Tools_List.DRAW,
    isSelected: false,
  },
  {
    toolName: 'Line Tool',
    onClick: () => selectToolFunction(Tools_List.LINE),
    icon: 'public/images/line.svg',
    id: Tools_List.LINE,
    isSelected: false,
  },
  {
    toolName: 'Rect Tool',
    icon: 'public/images/rectangle.svg',
    onClick: () => selectToolFunction(Tools_List.RECT),
    id: Tools_List.RECT,
    isSelected: false,
  },
  {
    toolName: 'Ellipse Tool - Hold CTRL for circle mode',
    onClick: () => selectToolFunction(Tools_List.ELLIPSE),
    icon: 'public/images/ellipse.svg',
    id: Tools_List.ELLIPSE,
    isSelected: false,
  },
  {
    toolName: 'Text Tool',
    onClick: () => selectToolFunction(Tools_List.TEXT),
    icon: 'public/images/text.svg',
    id: Tools_List.TEXT,
    isSelected: false,
  },
  {
    toolName: 'Select Tool',
    onClick: () => selectToolFunction(Tools_List.SELECT),
    icon: 'public/images/select.svg',
    id: Tools_List.SELECT,
    isSelected: false,
  },
  {
    toolName: 'Move Tool',
    onClick: () => selectToolFunction(Tools_List.MOVE),
    icon: 'public/images/move.svg',
    id: Tools_List.MOVE,
    isSelected: false,
  },
  {
    toolName: 'Delete',
    onClick: () => selectToolFunction(Tools_List.DELETE),
    icon: 'public/images/delete.svg',
    id: Tools_List.DELETE,
    isSelected: false,
  },
  {
    toolName: 'Unselect',
    onClick: () => selectToolFunction(null),
    icon: 'public/images/unselect.svg',
    id: -1,
    isSelected: false,
  },
];

export const getElementValueByIdGenerator =
  (shadowRoot?: ShadowRoot | null) => (id: SVGParamFieldID) => {
    return (shadowRoot?.getElementById(id) as HTMLInputElement | undefined)
      ?.value;
  };

export const handleUpdateSVGParameters = (target: EditorLayout) => {
  const getValueById = getElementValueByIdGenerator(target.shadowRoot);
  const fill = getValueById(SVGParamFieldID.FILL_COLOR);
  const fillOpacity = getValueById(SVGParamFieldID.FILL_OPACITY);
  const fontFamily = getValueById(SVGParamFieldID.TEXT_FONT_FAMILY);
  const fontSize = parseInt(
    getValueById(SVGParamFieldID.TEXT_FONT_SIZE) ?? '18'
  );
  const lineCap = getValueById(SVGParamFieldID.LINE_CAP) as CanvasLineCap;
  const lineDash = (getValueById(SVGParamFieldID.LINE_DASH) ?? '0')
    .split(',')
    .map(value => parseInt(value.trim()));
  const stroke = getValueById(SVGParamFieldID.STROKE_COLOR);
  const strokeOpacity = getValueById(SVGParamFieldID.STROKE_OPACITY);
  const strokeWidth = getValueById(SVGParamFieldID.STROKE_WIDTH);
  const text = getValueById(SVGParamFieldID.TEXT);
  target.editor?.setShapeParams(
    true,
    strokeWidth,
    stroke,
    fill,
    fillOpacity,
    strokeOpacity,
    lineCap,
    lineDash,
    fontFamily,
    fontSize,
    text
  );
  target.editor?.applyStyles();
};
