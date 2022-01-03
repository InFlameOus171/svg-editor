import { EditorLayout } from '.';
import { Tools_List } from '../../../types/shapes';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export const getToolboxButtonsProps = (
  selectToolFunction: (tool: Tools_List | null) => void
): IToolboxButtonProps[] => [
  {
    toolName: 'Draw Tool',
    onClick: () => selectToolFunction(Tools_List.DRAW),
    id: '1',
    isSelected: false,
  },
  {
    toolName: 'Line Tool',
    onClick: () => selectToolFunction(Tools_List.LINE),
    icon: 'public/images/line.png',
    id: '2',
    isSelected: false,
  },
  {
    toolName: 'Rect Tool',
    icon: 'public/images/rectangle.png',
    onClick: () => selectToolFunction(Tools_List.RECT),
    id: '3',
    isSelected: false,
  },
  {
    toolName: 'Ellipse Tool',
    onClick: () => selectToolFunction(Tools_List.ELLIPSE),
    id: '4',
    isSelected: false,
  },
  {
    toolName: 'Text Tool',
    onClick: () => selectToolFunction(Tools_List.TEXT),
    id: '5',
    isSelected: false,
  },
  {
    toolName: 'Select Tool',
    onClick: () => selectToolFunction(Tools_List.SELECT),
    id: '6',
    isSelected: false,
  },
  {
    toolName: 'Move Tool',
    onClick: () => selectToolFunction(Tools_List.MOVE),
    id: '7',
    isSelected: false,
  },
  {
    toolName: 'Delete',
    onClick: () => selectToolFunction(Tools_List.DELETE),
    id: '8',
    isSelected: false,
  },
  {
    toolName: 'Unselect',
    onClick: () => selectToolFunction(null),
    id: '0',
    isSelected: false,
  },
];

export const handleUpdateSVGParameters = (target: EditorLayout) => {
  const strokeWidth = (
    target.shadowRoot?.getElementById('stroke-width-input') as HTMLInputElement
  )?.value;
  const stroke = (
    target.shadowRoot?.getElementById('stroke-color-input') as HTMLInputElement
  )?.value;
  const fill = (
    target.shadowRoot?.getElementById('fill-color-input') as HTMLInputElement
  )?.value;
  const fillOpacity = (
    target.shadowRoot?.getElementById('fill-opacity-input') as HTMLInputElement
  )?.value;
  const lineDash = (
    target.shadowRoot?.getElementById('line-dash-input') as HTMLInputElement
  )?.value
    .split(',')
    .map(value => parseInt(value.trim()));
  const lineCap = (
    target.shadowRoot?.getElementById('line-cap-input') as HTMLInputElement
  )?.value as CanvasLineCap;
  const fontSize = (
    target.shadowRoot?.getElementById(
      'text-font-size-input'
    ) as HTMLInputElement
  )?.valueAsNumber;
  const fontFamily = (
    target.shadowRoot?.getElementById(
      'text-font-family-input'
    ) as HTMLInputElement
  )?.value;
  const text = (
    target.shadowRoot?.getElementById('text-input') as HTMLInputElement
  )?.value;
  const strokeOpacity = (
    target.shadowRoot?.getElementById(
      'stroke-opacity-input'
    ) as HTMLInputElement
  )?.value;
  console.log(stroke, fill, strokeOpacity, lineDash, lineCap, strokeWidth);
  target.editor?.setShapeParams(
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
