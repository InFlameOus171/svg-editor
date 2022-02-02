import { LitElement } from 'lit';
import { Tools_List } from '../../../util/helper/constants';
import { ToolboxButtonClickFunction, ToolboxButtonPropsType } from './ToolboxButton.types';
export declare class ToolboxButton extends LitElement {
    buttonId?: Tools_List;
    onClick?: ToolboxButtonClickFunction;
    toolName?: string;
    icon?: [string, string];
    disabled?: boolean;
    static styles: import("lit").CSSResult[];
    constructor(props: ToolboxButtonPropsType);
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
