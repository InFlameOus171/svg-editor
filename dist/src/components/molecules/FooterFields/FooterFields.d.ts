import { LitElement } from 'lit';
import { SVGParamsBase } from '../../../types/types';
import { SVGParamFieldID } from '../../../util/helper/constants';
export declare class FooterFields extends LitElement {
    availableFonts?: Set<string>;
    handleSVGParamChange?: (field: keyof SVGParamsBase, targetId: SVGParamFieldID) => void;
    static styles: import("lit").CSSResult[];
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
