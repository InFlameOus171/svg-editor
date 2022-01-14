import { LitElement } from 'lit';
import { SVGParamsBase } from '../../../types/types';
export declare class FooterFields extends LitElement {
    #private;
    availableFonts?: Set<string>;
    onSVGParamChange?: (field: keyof SVGParamsBase, value: any) => void;
    static styles: import("lit").CSSResult[];
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
