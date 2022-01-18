import { Tools_List } from '../../../util/helper/constants';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { SVGEditor } from '../../organisms/SVGEditor';
export declare const getButtonColumn: (tools?: IToolboxButtonProps[] | undefined) => import("lit-html").TemplateResult<1>[] | undefined;
export declare const getToolButton: (editor: SVGEditor, tool: Tools_List) => HTMLElement | null | undefined;
export declare const setIsButtonActive: (editor: SVGEditor, tool: Tools_List, isActive?: boolean) => void;
export declare const setIsButtonDisabled: (editor: SVGEditor, tool: Tools_List, isDisabled?: boolean) => void;
