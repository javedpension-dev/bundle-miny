import { chunk } from "lodash-es";
import { itemList } from "../../utils/items";
import object from "./object";

const objectManager = new (class {
	/** @type {Array} */
	static buildings = [];

	/**
	 *
	 * @name Add Game Object.
	 * @description Adds a game object to our cache.
	 * @param {Array} data - Contains information about the object to add, Compacted array.
	 * @memberof objectManager
	 */
	addGameObject(data) {
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

	/**
	 *
	 * @name removeGameObject
	 * @description Removes an object from our cache using it's SID.
	 * @param {Array} sid - Session I.D. of the building.
	 * @memberof objectManager
	 */
	removeGameObject(sid /** @type {number} */) {
		buildings.splice(this.getObjectBySid(sid), 1);
	}

	/**
	 *
	 * @name Get Object By SID.
	 * @description Retrieves an object through it's session i.d.
	 * @param {number} sid - Session I.D. of the building.
	 * @memberof objectManager
	 * @returns object
	 */
	getObjectBySid(sid /** @type {number} */) {
		return this.buildings.find((building) => building.sid === sid);
	}
})();

export default objectManager;
