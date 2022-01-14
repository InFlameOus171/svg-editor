import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGParamsBase } from '../../../types/types';
import { getFonts } from '../../../util/helper/availableFonts';
import { SVGParamFieldID } from '../../../util/helper/constants';
import {
  updateNextSiblingValue,
  updatePreviousSiblingValue,
} from '../../../util/helper/util';
import { footerFieldsStyles } from './FooterFields.styles';

@customElement('footer-fields')
export class FooterFields extends LitElement {
  @state()
  availableFonts?: Set<string>;

  @property()
  handleSVGParamChange?: (
    field: keyof SVGParamsBase,
    targetId: SVGParamFieldID
  ) => void;

  static styles = [footerFieldsStyles];

  constructor() {
    super();
    getFonts().then(fonts => (this.availableFonts = fonts));
  }

  render() {
    return html` <fieldset id="footer-fields">
      <div id="footer-input">
        <div id="left-input-section">
          <div>
            <label>
              Stroke width:
              <input
                type="number"
                id="stroke-width-input"
                @input="${() =>
                  this.handleSVGParamChange?.(
                    'strokeWidth',
                    SVGParamFieldID.STROKE_WIDTH
                  )}"
              />
            </label>
            <label>
              Line dash:
              <input
                type="text"
                id="line-dash-input"
                placeholder="3,3,3,12..."
                @input="${() =>
                  this.handleSVGParamChange?.(
                    'lineDash',
                    SVGParamFieldID.LINE_DASH
                  )}"
              />
            </label>
            <label>
              Linecap:
              <select
                @input="${() =>
                  this.handleSVGParamChange?.(
                    'lineCap',
                    SVGParamFieldID.LINE_CAP
                  )}"
                id="line-cap-input"
              >
                <option value="round">Round edge</option>
                <option value="butt">Flat edge</option>
              </select>
            </label>
          </div>
          <div id="footer-input-fields">
            <div>
              <label>
                Color:
                <input
                  type="color"
                  id="stroke-color-input"
                  @change=${() =>
                    this.handleSVGParamChange?.(
                      'stroke',
                      SVGParamFieldID.STROKE_COLOR
                    )}
                />
              </label>
              <label>
                Opacity:
                <input
                  type="range"
                  min="0"
                  step="0.1"
                  max="1"
                  @input=${(event: InputEvent) => {
                    updateNextSiblingValue(event);
                    this.handleSVGParamChange?.(
                      'stroke',
                      SVGParamFieldID.STROKE_OPACITY
                    );
                  }}
                />
                <input
                  id="stroke-opacity-input"
                  type="number"
                  @change=${(event: InputEvent) => {
                    updatePreviousSiblingValue(event);
                    this.handleSVGParamChange?.(
                      'stroke',
                      SVGParamFieldID.STROKE_OPACITY
                    );
                  }}
                />
              </label>
            </div>
            <div>
              <label>
                Fill:
                <input
                  type="color"
                  id="fill-color-input"
                  @input=${() =>
                    this.handleSVGParamChange?.(
                      'fill',
                      SVGParamFieldID.FILL_COLOR
                    )}
                />
              </label>
              <label>
                Opacity:
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  @input=${(event: InputEvent) => {
                    updateNextSiblingValue(event);
                    this.handleSVGParamChange?.(
                      'fill',
                      SVGParamFieldID.FILL_OPACITY
                    );
                  }}
                />
                <input
                  id="fill-opacity-input"
                  type="number"
                  @change=${(event: InputEvent) => {
                    updatePreviousSiblingValue(event);
                    this.handleSVGParamChange?.(
                      'fill',
                      SVGParamFieldID.FILL_OPACITY
                    );
                  }}
                />
              </label>
            </div>
          </div>
        </div>
        <fieldset id="right-input-section">
          <label
            >Font size:<input
              type="number"
              id="text-font-size-input"
              @input=${() =>
                this.handleSVGParamChange?.(
                  'fontSize',
                  SVGParamFieldID.TEXT_FONT_SIZE
                )}
          /></label>
          <label>
            Font family:
            <select
              id="text-font-family-input"
              @input=${() =>
                this.handleSVGParamChange?.(
                  'fontFamily',
                  SVGParamFieldID.TEXT_FONT_FAMILY
                )}
            >
              ${this.availableFonts &&
              Array.from(this.availableFonts).map(
                font => html`<option value=${font}>${font}</option>`
              )}
            </select>
          </label>
          <label>
            Text:
            <input
              type="text"
              id="text-input"
              @input=${() =>
                this.handleSVGParamChange?.('text', SVGParamFieldID.TEXT)}
            />
          </label>
        </fieldset>
      </div>
    </fieldset>`;
  }
}
