import { WS_EVENTS } from '../../types/network.types';

export class ConnectionMonitor {
  #ws: WebSocket;
  constructor(webSocket: WebSocket) {
    this.#ws = webSocket;
    webSocket.addEventListener('message', event => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.event === WS_EVENTS.PING) {
        const newEvent = JSON.stringify({ event: WS_EVENTS.PONG });
        webSocket.send(newEvent);
      }
    });
  }
  destroy = () => {
    this.#ws.removeEventListener('message', event => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.event === WS_EVENTS.PING) {
        const newEvent = JSON.stringify({ event: WS_EVENTS.PONG });
        this.#ws.send(newEvent);
      }
    });
  };
}
