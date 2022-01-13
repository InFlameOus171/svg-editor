import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { menuButtonStyles } from './MenuButton.styles';

@customElement('menu-button')
export class MenuButton extends LitElement {
  toggleButton(element: HTMLElement) {
    const buttonContainer = this.shadowRoot?.getElementById('button-container');
    buttonContainer?.classList.toggle('isActive');
  }
  static styles = [menuButtonStyles];
  render() {
    return html` <div id="button-container" @click=${this.toggleButton}>
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>`;
  }
}
