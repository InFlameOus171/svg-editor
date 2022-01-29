import {
  ConnectionStatus,
  RoomConnectionData,
} from '../../../types/network.types';
import { Coordinates } from '../../../types/types';
import { Editor } from '../../../util/Editor';
import { Tools_List } from '../../../util/helper/constants';
import { Connection } from '../../../util/network';
import { ToolboxButtonPropsType } from '../../atoms/ToolboxButton/ToolboxButton.types';

export type ToolGeneratorFunction = (
  handleSelectTool: (id: string) => void
) => Array<ToolboxButtonPropsType>;

export type EditorTemplateProps = {
  onSelectTool: (tool: Tools_List | null) => void;
  onMousePositionChange: (position?: Coordinates) => void;
  onJoinRoom: (data: RoomConnectionData) => void;
  onLeaveRoom: () => void;
  width: number;
  height: number;
  editor: Editor | null;
  position?: Coordinates;
  connection?: Connection;
  chatLog: Array<{ userName: string; message: string }>;
  connectionStatus: ConnectionStatus;
};
