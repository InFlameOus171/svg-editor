import { LitElement } from 'lit';
import { Coordinates } from '../../../types/types';
export declare class DrawZone extends LitElement {
    height: number;
    width: number;
    onPositionChange?: (position?: Coordinates) => void;
    protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
