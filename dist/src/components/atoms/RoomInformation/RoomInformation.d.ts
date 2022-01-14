import { LitElement } from 'lit';
export declare class RoomInformation extends LitElement {
    userName?: string;
    roomId?: string;
    onLeaveRoom?: () => void;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
