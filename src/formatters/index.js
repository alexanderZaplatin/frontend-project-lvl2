import plainRender from './plain';
import render from './render';

 export default (ast, format) => {
 	switch (format) {
 		case 'plain':
 		return plainRender(ast);
 		default:
 		return render(ast);
 	}
 };