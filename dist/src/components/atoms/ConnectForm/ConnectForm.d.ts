import { LitElement } from 'lit';
import { RoomData } from './ConnectForm.types';
export declare class ConnectForm extends LitElement {
    #private;
    onJoinRoom?: (data: RoomData) => void;
    userName?: string;
    roomId?: string;
    static styles: import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
}
