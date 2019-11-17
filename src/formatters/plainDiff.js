import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const plainDiff = (data1, data2) => {

 	const keysFirst = Object.keys(data1);
 	const keysSecond = Object.keys(data2);

  const delKeys = keysFirst.filter((key) => !keysSecond.includes(key));
  const delData = delKeys.reduce((acc, elem) => {
    const str = data1[elem];
    return [...acc, `- ${elem}:${str}`];
  }, []);

 	const result = keysSecond.reduce((acc, elem) => {
 		if(keysFirst.includes(elem) && (data2[elem] !== data1[elem]) ) {
 				const str = data2[elem];
         return [...acc, `+ ${elem}:${str}\n- ${elem}:${data1[elem]}`];
 		}
    if(keysFirst.includes(elem) && (data2[elem] === data1[elem])) {
      const str = data2[elem];
      return [...acc, `  ${elem}:${str}`];
    }
     if(!keysFirst.includes(elem)) {
      const str = data2[elem];
      return [...acc, `+ ${elem}:${str}`];
    }
    
 		return acc;
 	}, [])

   const total = `{\n${[...result, ...delData].join(`\n`)}\n}`;
return total;
 }; 

 export default plainDiff;