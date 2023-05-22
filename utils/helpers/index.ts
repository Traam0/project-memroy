import { shuffle } from "./shuffle";
import { pad } from "./pad";

function randomColor(): string {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export { shuffle, randomColor, pad };
