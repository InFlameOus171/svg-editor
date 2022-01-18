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
export const getToolButton = (editor, tool) => {
    var _a, _b, _c;
    const toolBox = (_a = editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('tool-box');
    const toolBoxButton = (_b = toolBox === null || toolBox === void 0 ? void 0 : toolBox.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('tool-box-button-' + tool);
    return (_c = toolBoxButton === null || toolBoxButton === void 0 ? void 0 : toolBoxButton.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById(tool);
};
export const setIsButtonActive = (editor, tool, isActive = true) => {
    const toolButton = getToolButton(editor, tool);
    toolButton === null || toolButton === void 0 ? void 0 : toolButton.setAttribute('isactive', `${isActive}`);
};
export const setIsButtonDisabled = (editor, tool, isDisabled = true) => {
    const toolButton = getToolButton(editor, tool);
    if (isDisabled) {
        toolButton === null || toolButton === void 0 ? void 0 : toolButton.setAttribute('disabled', '');
    }
    else {
        toolButton === null || toolButton === void 0 ? void 0 : toolButton.removeAttribute('disabled');
    }
};
//# sourceMappingURL=ToolBox.util.js.map