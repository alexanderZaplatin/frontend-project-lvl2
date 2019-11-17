import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
	'.json': (e) => JSON.parse(e),
	'.yml': (e) => yaml.safeLoad(e),
	'.ini': (e) => ini.parse(e),
};

export default (type, e) => parser[type](e); 