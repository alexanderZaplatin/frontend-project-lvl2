import path from 'path';

const genDiff = (d1, d2) => {

	const data1 = JSON.parse(d1, 'utf-8');
	const data2 = JSON.parse(d2, 'utf-8');

 	const keysFirst = Object.keys(data1);
 	const keysSecond = Object.keys(data2);

  const delKeys = keysFirst.filter((key) => !keysSecond.includes(key));
  const delData = delKeys.reduce((acc, elem) => {
    const str = data1[elem];
    return [...acc, ` - ${elem}:${str}`];
  }, []);

 	const result = keysSecond.reduce((acc, elem) => {
 		if(keysFirst.includes(elem) && (data2[elem] !== data1[elem]) ) {
 				const str = data2[elem];
         return [...acc, ` + ${elem}:${str}  - ${elem}:${data1[elem]}`];
 		}
    if(keysFirst.includes(elem) && (data2[elem] === data1[elem])) {
      const str = data2[elem];
      return [...acc, ` ${elem}:${str}`];
    }
     if(!keysFirst.includes(elem)) {
      const str = data2[elem];
      return [...acc, ` + ${elem}:${str}`];
    }
    
 		return acc;
 	}, [])

   const total = [result,delData]
return total.join('');
 }; 

 export default genDiff;