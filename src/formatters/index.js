import plainDiff from './plainDiff';
import render from './render';
 export default (ast, format) => {
 	switch (format) {
 		case 'plain':
 		return plainDiff(ast);
 		default:
 		return render(ast);
 	}
 };