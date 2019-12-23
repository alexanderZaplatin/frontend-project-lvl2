const repeat = (num) => ' '.repeat(num);
const space = (num) => {
	if (num === 1) {
		return repeat(4);
	}
	if (num === 2) {
		return repeat(8);
	}
	return repeat(0);
};

export { repeat, space };
