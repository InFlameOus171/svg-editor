import { Tools_List } from '../../../util/helper/constants';
import { EditorTemplate } from '../../templates/EditorTemplate';
export declare const getToolButton: (editor: EditorTemplate, tool: Tools_List) => HTMLElement | null | undefined;
export declare const setIsButtonActive: (editor: EditorTemplate, tool: Tools_List, isActive?: boolean) => void;
export declare const setIsButtonDisabled: (editor: EditorTemplate, tool: Tools_List, isDisabled?: boolean) => void;
