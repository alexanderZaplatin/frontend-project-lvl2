import _ from 'lodash/fp';


const astBuilder = (fileBefore, fileAfter) => {
	const values = _.union(Object.keys(fileBefore), Object.keys(fileAfter));
	values.sort();
	const res = values.map((key) => {
		if (_.isObject(fileBefore[key]) && _.isObject(fileAfter[key])) {
			return {
				key,
				action: 'inside',
				children: astBuilder(fileBefore[key], fileAfter[key]),
			}
		}
		if (!_.has(key, fileAfter)) {
			return{
				key,
				value: fileBefore[key],
				action: 'deleted',
			}
		}
		if (!_.has(key, fileBefore)) {
			return {
				key,
				value: fileAfter[key],
				action: 'added',
			}
		}
		if (fileBefore[key] === fileAfter[key]) {
			return {
				key,
				value: fileAfter[key],
				action: 'nothing',
			}
		}
		return {
			key,
			valueBefore: fileBefore[key],
			valueAfter: fileAfter[key],
			action: 'updated',
		}
	});
	return res;
};

export default astBuilder;