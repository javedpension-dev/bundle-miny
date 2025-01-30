/*
MAIN FILE.


*/

import { chunk } from "lodash-es";
import addPacketHandlers from "../networking/addPacketHandlers.js";
import addDocumentListeners from "../networking/documentListeners.js";
import log from "../utils/log.js";
import Client from "./client.js";

const client = new Client();
export default client;

const send = WebSocket.prototype.send;
WebSocket.prototype.send = new Proxy(send, {
	apply: (target, websocket, args) => {
		if (!client.ws) client.assignWS(websocket);

		if (!window.clientAccount) {
			alert("Please login using the button at the top right!");
			return;
		}
		return Reflect.apply(target, websocket, args);
	},
});

addPacketHandlers();
addDocumentListeners();
export { chunk };

log.add("Loaded Script successfully!");
