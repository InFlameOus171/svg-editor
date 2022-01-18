export class ConnectionMonitor {
  #ws: WebSocket;
  constructor(webSocket: WebSocket) {
    this.#ws = webSocket;
    webSocket.addEventListener('message', event => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.event === 'ping') {
        webSocket.send('{"event":"pong"}');
      }
    });
  }
  destroy = () => {
    this.#ws.removeEventListener('message', event => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.event === 'ping') {
        this.#ws.send('{"event":"pong"}');
      }
    });
  };
}
