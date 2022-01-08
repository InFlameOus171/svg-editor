import { nanoid } from 'nanoid';
import { ShapeType } from '../../types/shapes';
import { Keeper } from './Keeper';

export class Connection {
  ws: WebSocket;
  static userName: string = 'user_' + nanoid(5);
  #userId: string;
  #url: string;
  #port: string;
  #room: string;
  #keeper: Keeper;
  #chat?: HTMLElement | null;
  constructor(
    room: string = '',
    user: string = 'user_' + nanoid(5),
    url: string = 'localhost',
    port: string = '8080'
  ) {
    this.#url = url;
    this.#port = port;
    this.#room = room;
    Connection.userName = user;
    this.#userId = nanoid();
    this.ws = this.createNewWebSocket();
    this.#keeper = this.#startKeepingConnectionAlive(this.ws);
  }

  disconnect = () => {
    this.ws.close();
  };

  joinRoom = (room: string) => {
    this.connect(this.#url, this.#port, room);
  };

  getRoom = () => {
    return this.#room;
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
    const roomQuery = '?room=' + this.#room;
    const ws = new WebSocket(`ws://${this.#url}:${this.#port}${roomQuery}`);

    ws.onopen = () => {
      ws.send(
        `{"event":"join-room", "room":"${this.#room}", "user": "${
          Connection.userName
        }"}`
      );
    };

    ws.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      if (data.event === 'message') {
        if (!data.value) {
          return;
        }
        const newEntry = document.createElement('div');
        newEntry.setAttribute('class', 'chat-entry');
        const userName = document.createElement('div');
        const message = document.createElement('div');
        userName.innerHTML = data.user ? data.user + ':' : '';
        message.innerHTML = data.value;
        newEntry.appendChild(userName);
        newEntry.appendChild(message);
        this.#chat?.appendChild(newEntry);
      }
      ws.send('{"event":"received"}');
    });

    this.#startKeepingConnectionAlive(ws);

    return ws;
  };

  sendChatMessage = (message?: string) => {
    if (!message) return;
    const payload = JSON.stringify({
      event: 'message',
      room: this.#room,
      user: Connection.userName,
      userId: this.#userId,
      value: message,
    });
    this.ws.send(payload);
  };

  lockShape = (shape: ShapeType) => {
    const payload = JSON.stringify({
      event: 'lock-shape',
      // value: shape.getId(),
      room: this.#room,
      user: Connection.userName,
      userId: this.#userId,
      value: JSON.stringify(shape.getDeconstructedShapeData()),
    });
    this.ws.send(payload);
  };

  unlockShapes = () => {
    const payload = JSON.stringify({
      event: 'unlock-shapes',
      room: this.#room,
      user: Connection.userName,
      userId: this.#userId,
    });
    this.ws.send(payload);
  };

  createShapes = (shapes: ShapeType[]) => {
    const payload = JSON.stringify({
      event: 'create-shapes',
      room: this.#room,
      user: Connection.userName,
      userId: this.#userId,
      value: shapes.map(shape =>
        JSON.stringify(shape.getDeconstructedShapeData())
      ),
    });
    this.ws.send(payload);
  };

  connect = (
    url: string = this.#url,
    port: string = this.#port,
    room?: string
  ) => {
    this.disconnect();
    url = url;
    port = port;
    room = room ?? room;
    this.createNewWebSocket();
  };
}
