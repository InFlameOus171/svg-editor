import { html } from 'lit';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export const getButtonColumn = (
  interval: [number, number],
  tools?: Array<IToolboxButtonProps>
) =>
  tools?.slice(interval[0], interval[1]).map(
    (tool, index) =>
      html`
        <span class="row-${index}">
          <toolbox-button
            .onClick=${tool.onClick}
            .buttonId=${tool.id}
            .toolName=${tool.toolName}
            .icon=${tool.icon}
          >
          </toolbox-button>
        </span>
      `
  );
