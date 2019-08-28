import ow from "ow--fork-by-jblew-with-catching";

export function forbidUndefinedKeys(obj: object & { [x: string]: any }) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "undefined") {
                throw new TypeError("Undefined properties are forbidden for this object. Property key: " + key);
            }
        }
    }
}
