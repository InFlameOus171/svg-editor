var _DialogSection_readerEventHandler;
import { __classPrivateFieldGet, __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dialogSectionStyles } from './DialogSection.styles';
let DialogSection = class DialogSection extends LitElement {
    constructor() {
        super(...arguments);
        _DialogSection_readerEventHandler.set(this, (readerEvent) => {
            var _a, _b;
            try {
                const content = (_a = readerEvent.target) === null || _a === void 0 ? void 0 : _a.result;
                if (typeof content === 'string') {
                    const parser = new DOMParser();
                    (_b = this.onSelectSvgFile) === null || _b === void 0 ? void 0 : _b.call(this, parser.parseFromString(content, 'image/svg+xml'));
                }
            }
            catch (error) {
                alert('SVG Element count not be imported');
            }
        });
        this.handleSelectFile = (event) => {
            const files = event.target.files;
            const file = files === null || files === void 0 ? void 0 : files[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.addEventListener('load', __classPrivateFieldGet(this, _DialogSection_readerEventHandler, "f"));
            event.target.value = '';
            reader.readAsText(file);
        };
    }
    render() {
        return html `
      <label id="open-svg-button">
        Open
        <input
          id="open-file"
          type="file"
          hidden
          @input=${this.handleSelectFile}
          accept="image/svg+xml"
        />
      </label>
      <label id="on-save-button">
        Save
        <input type="button" id="save" @click=${this.onSave}></div>
      </label>
    `;
    }
};
_DialogSection_readerEventHandler = new WeakMap();
DialogSection.styles = [dialogSectionStyles];
__decorate([
    property()
], DialogSection.prototype, "onSelectSvgFile", void 0);
__decorate([
    property()
], DialogSection.prototype, "onSave", void 0);
DialogSection = __decorate([
    customElement('dialog-section')
], DialogSection);
export { DialogSection };
//# sourceMappingURL=DialogSection.js.map