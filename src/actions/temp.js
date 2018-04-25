export function getTemp(data) {
    return function(dispatch) {
        return new Promise(function(resolve, reject) {
            var W3CWebSocket = require('websocket').w3cwebsocket;
            var client = new W3CWebSocket('ws://wot.city/object/testman/viewer', '');
            client.onmessage = function(e) {
                if (typeof e.data === 'string') {
                    dispatch({
                        type: 'MESSAGE_TEMP',
                        data: JSON.parse(e.data).temp
                    });
                }
            };
            client.onclose = function() {
                reject('onclose');
            };
            client.onerror = function(err) {
                reject(err);
            }
        }).then(function() {

        }).catch((e) => { console.log(e) });
    }
}