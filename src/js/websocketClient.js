export var Singleton = (function () {
  var instance;

  function createInstance() {
    var object = new WebSocket("ws://127.0.0.1:9001");
    return object;
  }

  return {
    getInstance: function () {
      //  if (!instance) {
      instance = createInstance();
      instance.onopen = () => {
        console.log("websocket open");
      };
      instance.onclose = () => {
        console.log("websocket closed");
      };
      // }
      return instance;
    },
  };
})();
