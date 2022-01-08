import { html } from 'lit';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export const getButtonColumn = (tools?: Array<IToolboxButtonProps>) => {
  let counter = 0;
  return tools?.map((tool, index) => {
    index % 2 == 0 && ++counter;
    return html`
      <span class="row-${counter}">
        <toolbox-button
          id=${'tool-box-button-' + tool.id}
          .onClick=${tool.onClick}
          .buttonId=${tool.id}
          .toolName=${tool.toolName}
          .icon=${tool.icon}
          .disabled=${tool.disabled}
        >
        </toolbox-button>
      </span>
    `;
  });
};
