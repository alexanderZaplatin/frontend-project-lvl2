import _ from 'lodash/fp';


const buildAst = (fileBefore, fileAfter) => {
  const values = _.union(Object.keys(fileBefore), Object.keys(fileAfter));
  values.sort();
  const result = values.map((key) => {
    if (_.isObject(fileBefore[key]) && _.isObject(fileAfter[key])) {
      return {
        key,
        type: 'nested',
        children: buildAst(fileBefore[key], fileAfter[key]),
      };
    }
    if (!_.has(key, fileAfter)) {
      return {
        key,
        valueAfter: fileBefore[key],
        type: 'deleted',
      };
    }
    if (!_.has(key, fileBefore)) {
      return {
        key,
        valueAfter: fileAfter[key],
        type: 'added',
      };
    }
    if (fileBefore[key] === fileAfter[key]) {
      return {
        key,
        valueAfter: fileAfter[key],
        type: 'unchanged',
      };
    }
    return {
      key,
      valueBefore: fileBefore[key],
      valueAfter: fileAfter[key],
      type: 'updated',
    };
  });
  return result;
};
export default buildAst;
