import { decode, encode } from "msgpack-lite";

export default class Client {
	constructor() {
		this.ws;
		this.packetHandlers = new Map();
	}

	assignWS(ws) {
		this.ws = ws;

		this.ws.addEventListener("message", (event) => {
			this.receive(event);
		});
		//this.ws.onmessage = this.receive.bind(this);
	}

	send(data) {
		this.ws.send(new Uint8Array(Array.from(encode(data))));
	}

	decode(data) {
		try {
			return decode(new Uint8Array(data));
		} catch (error) {
			console.error(`[!] Error: ${error}`);
		}
	}

	registerPacketHandler(type, handler) {
		this.packetHandlers.set(type, handler);
	}

	receive(event) {
		const data = this.decode(event.data);

		const packetType = data[0];
		const handler = this.packetHandlers.get(packetType);

		if (handler) {
			handler(data.slice(1)[0]);
		}
	}
}
