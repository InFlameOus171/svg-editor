import { LitElement } from 'lit';
export declare class ConnectForm extends LitElement {
    #private;
    onJoinRoom?: (data: {
        userName?: string;
        roomId?: string;
    }) => void;
    userName?: string;
    roomId?: string;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
