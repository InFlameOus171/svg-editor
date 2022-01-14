import { LitElement } from 'lit';
import { Tools_List } from '../../../util/helper/constants';
export declare class ToolboxButton extends LitElement {
    #private;
    toolName: string;
    icon?: [string, string];
    class?: string;
    buttonId?: Tools_List;
    disabled?: boolean;
    onClick?: (id: Tools_List) => void;
    static styles: import("lit").CSSResult[];
    firstUpdated(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
