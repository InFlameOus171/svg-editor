import { LitElement } from 'lit';
export declare class Chat extends LitElement {
    chatLog: Array<{
        userName: string;
        message: string;
    }>;
    onSendMessage?: (message?: string) => void;
    isDisabled?: boolean;
    static styles: import("lit").CSSResult[];
    handleSendMessage: () => void;
    protected updated(_changedProperties: Map<string | number | symbol, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
