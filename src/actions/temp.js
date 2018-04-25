
export function getTemp(data) {
  return function(dispatch) {
    var W3CWebSocket = require('websocket').w3cwebsocket;
    var client = new W3CWebSocket('ws://wot.city/object/testman/viewer', '');

    client.onerror = function() {
        console.log('Connection Error');
    };
     
    client.onopen = function() {
        console.log('WebSocket Client Connected');
    };
     
    client.onclose = function() {
        console.log('echo-protocol Client Closed');
    };
     
    client.onmessage = function(e) {
        if (typeof e.data === 'string') {
            dispatch({
                  type: 'MESSAGE_TEMP',
                  data: JSON.parse(e.data).temp
            });
        }
    };
  }
}