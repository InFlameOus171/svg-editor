import { html } from 'lit';
import { ToolGeneratorFunction } from './EditorLayout.types';

export const generateTools: ToolGeneratorFunction = handleToolSelection => [
  { title: 'Tool 0', onClick: handleToolSelection, id: '0' },
  { title: 'Tool 1', onClick: handleToolSelection, id: '1' },
  { title: 'Tool 2', onClick: handleToolSelection, id: '2' },
  { title: 'Tool 3', onClick: handleToolSelection, id: '3' },
  { title: 'Tool 4', onClick: handleToolSelection, id: '4' },
  { title: 'Tool 5', onClick: handleToolSelection, id: '5' },
  { title: 'Tool 6', onClick: handleToolSelection, id: '6' },
];

export const getButtonColumn = (
  tools: Array<any>,
  interval: [number, number]
) =>
  tools
    .slice(interval[0], interval[1])
    .map(
      (tool, index) =>
        html`<span class="colum-${index % 2}"
          ><toolbox-button .props=${tool}></toolbox-button
        ></span>`
    );
