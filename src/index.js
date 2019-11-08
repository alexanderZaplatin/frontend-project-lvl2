import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const genDiff = (filePath1, filePath2) => {

  const d1 = fs.readFileSync(filePath1, 'utf8');
  const d2 = fs.readFileSync(filePath2, 'utf8');

let data1;
let data2;

if(path.extname(filePath1) === '.json' && path.extname(filePath2) === '.json') {
  data1 = JSON.parse(d1);
  data2 = JSON.parse(d2);
} else if(path.extname(filePath1) === '.yml' && path.extname(filePath2) === '.yml') {
  data1 = yaml.safeLoad(d1);
  data2 = yaml.safeLoad(d2);
} else if(path.extname(filePath1) === '.ini' && path.extname(filePath2) === '.ini') {
  data1 = ini.parse(d1);
  data2 = ini.parse(d2);
} 

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

   const total = [...result,...delData]
return total.join('\n');
 }; 

 export default genDiff;