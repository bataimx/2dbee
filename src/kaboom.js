import kaboom from "../node_modules/kaboom/dist/kaboom.mjs";

export const k = kaboom({
	global: true,
	scale: 2,
	fullscreen: true,
	clearColor: [0, 0, 0, 1],
	debug: true,
});
// k.debug.inspect = true;
export default k;