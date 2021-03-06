var _TextTool_onClick;
import { __classPrivateFieldGet } from "tslib";
import { textPlaceHolder, Tools_List } from '../../helper/constants';
import { measureText } from '../../helper/shapes';
import { TextShape } from '../../shapes/Text/Text';
import { setTextParamsSourceVisibility } from './TextTool.util';
import { Tool } from '../Tool';
export class TextTool extends Tool {
    constructor(drawLayer, previewLayer, self, onCreate, currentStyles, offset, footerFields) {
        super(drawLayer, self, onCreate, offset, previewLayer, currentStyles, undefined, footerFields);
        _TextTool_onClick.set(this, (event) => {
            var _a;
            if (event.button !== 0)
                return;
            const position = this.getCoords(event);
            if (this.previewContext && ((_a = this.drawPenConfig) === null || _a === void 0 ? void 0 : _a.text)) {
                const size = measureText(this.drawPenConfig.text, {
                    fill: 'rgba(0,0,0,0)',
                    stroke: 'rgba(0,0,0,0)',
                    fontSize: this.drawPenConfig.fontSize,
                    fontFamily: this.drawPenConfig.fontFamily,
                }, undefined, this.drawContext);
                this.resetPreview();
                if (size) {
                    const shape = new TextShape(size.width, size.height, position, Object.assign({ fontFamily: this.drawPenConfig.fontFamily, fontSize: this.drawPenConfig.fontSize, text: this.drawPenConfig.text }, this.drawPenConfig));
                    this.onUpdateEditor(shape);
                }
            }
        });
        this.updateText = (text) => {
            this.drawPenConfig.text = text;
        };
        this.executeAction = () => {
            this.drawLayer.addEventListener('click', __classPrivateFieldGet(this, _TextTool_onClick, "f"));
        };
        this.destroy = () => {
            setTextParamsSourceVisibility(this.footerFields, false);
            this.drawLayer.removeEventListener('click', __classPrivateFieldGet(this, _TextTool_onClick, "f"));
        };
        setTextParamsSourceVisibility(footerFields, true);
        if (!this.drawPenConfig.text) {
            this.drawPenConfig.text = textPlaceHolder;
        }
        this.toolName = Tools_List.TEXT;
    }
}
_TextTool_onClick = new WeakMap();
//# sourceMappingURL=TextTool.js.map