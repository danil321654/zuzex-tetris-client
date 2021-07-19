import { getRandomInt } from "./getRandomInt";
import { getShape } from "./getShape";
export const getRandomShape = (middle) => getShape(getRandomInt(7), middle);
