import { decode, encode } from "msgpack-lite";

/**
 *
 */
export default class Client {
	/**
	 *
	 */
	constructor() {
		this.ws;
		this.packetHandlers = new Map();
	}

	/**
	 *
	 * @param {object} ws - the websocket created by the bundle.
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
	 * @param {Array} data - data to send to the server.
	 * @example <Client>.send(["6", ["Chat message"]]);
	 */
	send(data) {
		this.ws.send(new Uint8Array(Array.from(encode(data))));
	}

	/**
	 *
	 * @param {any} data - the incoming data (should be Uint8Array).
	 * @returns {object}
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
	 * @param {string} type - the type of packet.
	 * @param {function} handler - the event(s) that will be triggered.
	 */
	registerPacketHandler(type, handler) {
		this.packetHandlers.set(type, handler);
	}

	/**
	 *
	 * @param {object} event - message event.
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
