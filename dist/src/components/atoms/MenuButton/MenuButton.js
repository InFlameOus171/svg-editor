import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { menuButtonStyles } from './MenuButton.styles';
let MenuButton = class MenuButton extends LitElement {
    toggleButton(element) {
        var _a;
        const buttonContainer = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('button-container');
        buttonContainer === null || buttonContainer === void 0 ? void 0 : buttonContainer.classList.toggle('isActive');
    }
    render() {
        return html ` <div id="button-container" @click=${this.toggleButton}>
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>`;
    }
};
MenuButton.styles = [menuButtonStyles];
MenuButton = __decorate([
    customElement('menu-button')
], MenuButton);
export { MenuButton };
//# sourceMappingURL=MenuButton.js.map