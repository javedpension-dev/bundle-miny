import { decode, encode } from "msgpack-lite";

/**
 * @class Client
 */
export default class Client {
	/**
	 * @constructor
	 */
	constructor() {
		this.ws;
		this.packetHandlers = new Map();
	}

	/**
	 *
	 * @name Assign WebSocket.
	 * @description Assigns and stores the game's websocket instance in cache.
	 * @param {object} ws - the websocket created by the bundle.
	 * @memberof Client
	 */
	assignWS(ws) {
		this.ws = ws;

		this.ws.addEventListener("message", (event) => {
			this.receive(event);
		});
		//this.ws.onmessage = this.receive.bind(this);
	}

	/**
	 *
	 * @name Send.
	 * @description Sends data to the server through the game's websocket. Encodes using MsgPack Lite for efficiency.
	 * @param {Array} data - The data to send to the server.
	 * @example <Client>.send(["6", ["Chat message"]]);
	 * @memberof Client
	 */
	send(data) {
		this.ws.send(new Uint8Array(Array.from(encode(data))));
	}

	/**
	 *
	 * @name Decode.
	 * @description Deserializes MsgPack messages.
	 * @param {any} data - The incoming message.
	 * @returns {object}
	 * @memberof Client
	 */
	decode(data) {
		try {
			return decode(new Uint8Array(data));
		} catch (error) {
			console.error(`[!] Error: ${error}`);
		}
	}

	/**
	 *
	 * @name Register Packet Handler.
	 * @description Registers packet event hooks on the WebSocket.prototype.onmessage event.
	 * @param {string} type - The type of packet.
	 * @param {function} handler - The event(s) that will be triggered.
	 * @memberof Client
	 */
	registerPacketHandler(type, handler) {
		this.packetHandlers.set(type, handler);
	}

	/**
	 *
	 * @name Receive Message.
	 * @description Receives incoming messages from the game.
	 * @param {object} event - Message event. Use <event>.data to get the data.
	 * @memberof Client
	 */
	receive(event) {
		const data = this.decode(event.data);

		const packetType = data[0];
		const handler = this.packetHandlers.get(packetType);

		if (handler) {
			handler(data.slice(1)[0]);
		}
	}
}
