import { LitElement } from 'lit';
export declare class DrawZone extends LitElement {
    height: number;
    width: number;
    onPositionChange?: (position?: [number, number]) => void;
    protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
