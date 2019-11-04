import path from 'path';
import fs from 'fs';

const genDiff = (filePath1, filePath2) => {

  const d1 = fs.readFileSync(filePath1, 'utf8');
  const d2 = fs.readFileSync(filePath2, 'utf8');


	const data1 = JSON.parse(d1);
	const data2 = JSON.parse(d2,);

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