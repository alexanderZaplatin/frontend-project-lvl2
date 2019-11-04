prepublish:
	npm publish --dry-run

lint:
	npx eslint 

test-coverage:
	npm test -- --coverage