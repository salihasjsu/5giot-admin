let webSocket = null;
function createWebSocketClient() {
  webSocket = new WebSocket("ws://127.0.0.1:9001");

  webSocket.onopen = () => {
    console.log("Websocket open");
  };

  webSocket.onclose = () => {
    console.log("Websocket close");
  };
  return webSocket;
}

export function getWSClient() {
  const _wsClient = webSocket ? webSocket : createWebSocketClient();
  if (!webSocket) webSocket = _wsClient;
  return webSocket;
}
