import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export type ToolGeneratorFunction = (
  handleToolSelection: (id: string) => void
) => Array<IToolboxButtonProps>;

export interface IEditorLayoutState {
  selectedTool: string | null;
}
