import { LitElement } from 'lit';
import type { NullableString } from '../../../types/types.js';
import { Tools_List } from '../../../util/helper/constants.js';
import type { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
export declare class ToolBox extends LitElement {
    tools?: IToolboxButtonProps[];
    onChange?: () => Tools_List;
    toolsLength: number | undefined;
    selectedTool?: NullableString;
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
