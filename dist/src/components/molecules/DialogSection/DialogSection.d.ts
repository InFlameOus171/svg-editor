import { LitElement } from 'lit';
export declare class DialogSection extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    onSelectSvgFile?: (data: Document) => void;
    onSave?: (event: MouseEvent) => void;
    handleSelectFile: (event: Event) => void;
    render(): import("lit-html").TemplateResult<1>;
}
