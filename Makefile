install:
	install-deps

run:
	bin/nodejs-package.js 10

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8
