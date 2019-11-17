import plainRender from './plain';
import jsonRender from './jsonRender'
import render from './render';

 export default (ast, format) => {
 	switch (format) {
 		case 'plain':
 		return plainRender(ast);
 		case 'json':
 		return jsonRender(ast);
 		default:
 		return render(ast);
 	}
 };