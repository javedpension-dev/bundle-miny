import { chunk } from "lodash-es";
import { itemList } from "../../utils/items";
import object from "./object";

const objectManager = new (class {
	/** @type {Array} */
	static buildings = [];

	addGameObject(data /** @type {Array} */) {
		const object_data = chunk(data[0], 8);

		for (const chunk /** @type {Array} */ of object_data) {
			const new_object = new object(
				chunk[0],
				chunk[1],
				chunk[2],
				chunk[3],
				chunk[4],
				chunk[5],
				itemList[chunk[6]],
				true,
				chunk[7],
			);

			this.constructor.buildings.push(new_object);
		}
	}

	removeGameObject(sid /** @type {number} */) {
		buildings.splice(this.getObjectBySid(sid), 1);
	}

	getObjectBySid(sid /** @type {number} */) {
		return this.buildings.find((building) => building.sid === sid);
	}
})();

export default objectManager;
