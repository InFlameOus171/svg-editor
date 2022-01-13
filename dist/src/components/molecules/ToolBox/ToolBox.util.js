import { html } from 'lit';
export const getButtonColumn = (tools) => {
    let counter = 0;
    return tools === null || tools === void 0 ? void 0 : tools.map((tool, index) => {
        index % 3 == 0 && ++counter;
        return html `
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
//# sourceMappingURL=ToolBox.util.js.map