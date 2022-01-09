import { nanoid } from 'nanoid';
import { ParsedData } from '../../types/network.types';
import { ShapeType } from '../../types/shapes';
import { Keeper } from './Keeper';

export class Connection {
  ws: WebSocket;
  static userName: string = 'user_' + nanoid(5);
  #userId: string;
  #url: string;
  #port: string;
  #roomId: string;
  #keeper: Keeper;
  #chat?: HTMLElement | null;
  onDeleteShapes: (ids: string[]) => void;
  onUpdateShapes: (shapes: ShapeType[]) => void;
  onGetAllShapes: () => ShapeType[];
  constructor(
    roomId: string = '',
    user: string = 'user_' + nanoid(5),
    onDeleteShapes: (ids: string[]) => void,
    onUpdateShapes: (shape: ShapeType[]) => void,
    onGetAllShapes: () => ShapeType[],
    url: string = 'localhost',
    port: string = '8080'
  ) {
    this.#url = url;
    this.#port = port;
    this.#roomId = roomId;
    Connection.userName = user;
    this.#userId = nanoid();
    this.ws = this.createNewWebSocket();
    this.#keeper = this.#startKeepingConnectionAlive(this.ws);
    this.onDeleteShapes = onDeleteShapes;
    this.onUpdateShapes = onUpdateShapes;
    this.onGetAllShapes = onGetAllShapes;
  }

  disconnect = () => {
    this.ws.close();
  };

  joinRoom = (roomId: string) => {
    this.connect(this.#url, this.#port, roomId);
  };

  getRoom = () => {
    return this.#roomId;
  };

  #startKeepingConnectionAlive = (ws: WebSocket) => {
    if (this.#keeper) {
      this.#keeper.destroy();
    }
    this.#keeper = new Keeper(ws);
    return this.#keeper;
  };

  setChat = (element?: HTMLElement | null) => {
    this.#chat = element;
  };

  createNewWebSocket = () => {
    const ws = new WebSocket(`ws://${this.#url}:${this.#port}`);

    ws.onopen = () => {
      const payload = {
        event: 'join-room',
        roomId: this.#roomId,
        value: JSON.stringify(
          this.onGetAllShapes().map(shape => shape.getDeconstructedShapeData())
        ),
        user: Connection.userName,
      };
      ws.send(JSON.stringify(payload));
    };

    ws.addEventListener('message', msg => {
      const data: ParsedData = JSON.parse(msg.data);
      const { value = '', event, user, userId } = data;
      switch (event) {
        case 'message':
          {
            const newEntry = document.createElement('div');
            newEntry.setAttribute('class', 'chat-entry');
            const userName = document.createElement('div');
            const message = document.createElement('div');
            userName.innerHTML = user ? user + ':' : '';
            message.innerHTML = value;
            newEntry.appendChild(userName);
            newEntry.appendChild(message);
            this.#chat?.appendChild(newEntry);
          }
          break;
        case 'update-shapes': {
          this.onUpdateShapes((JSON.parse(value) ?? []) as ShapeType[]);
          break;
        }
        case 'get-shapes': {
          const updatedShapes = JSON.parse(value);
          console.log('received shapes:', updatedShapes);
          this.onUpdateShapes(updatedShapes);
          break;
        }
      }
    });
    this.#startKeepingConnectionAlive(ws);
    return ws;
  };

  sendChatMessage = (message?: string) => {
    if (!message) return;
    const payload = JSON.stringify({
      event: 'message',
      roomId: this.#roomId,
      user: Connection.userName,
      userId: this.#userId,
      value: message,
    });
    this.ws.send(payload);
  };

  sendShapes = (shapes: ShapeType[]) => {
    if (!shapes.length) return;
    const payload = JSON.stringify({
      event: '',
    });
  };

  lockShape = (shape: ShapeType) => {
    const payload = JSON.stringify({
      event: 'lock-shape',
      // value: shape.getId(),
      roomId: this.#roomId,
      user: Connection.userName,
      userId: this.#userId,
      value: JSON.stringify(shape.getDeconstructedShapeData()),
    });
    this.ws.send(payload);
  };

  unlockShapes = () => {
    const payload = JSON.stringify({
      event: 'unlock-shapes',
      roomId: this.#roomId,
      user: Connection.userName,
      userId: this.#userId,
    });
    this.ws.send(payload);
  };

  createShapes = (shapes: ShapeType[]) => {
    const payload = JSON.stringify({
      event: 'update-shapes',
      roomId: this.#roomId,
      user: Connection.userName,
      userId: this.#userId,
      value: shapes.map(shape =>
        JSON.stringify(shape.getDeconstructedShapeData())
      ),
    });
    console.log(payload);
    this.ws.send(payload);
  };

  connect = (
    url: string = this.#url,
    port: string = this.#port,
    roomId?: string
  ) => {
    this.disconnect();
    url = url;
    port = port;
    roomId = roomId ?? roomId;
    this.createNewWebSocket();
  };
}
