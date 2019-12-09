# Common API tests

## Introduction

While writing automated API Tests for Postman, we've noticed a lot of code was being repeated.
To increase the quality and simplify the creation of these tests, we've bundled the most commonly used test scripts in one JavaScript file.
This file can be imported in your Postman API Test so you don't have to write or repeat it all over again.

For readability reasons the syntax of the current scripts is based on [Postman BDD](https://github.com/JamesMessinger/postman-bdd) which in turn uses [Chai-JS assertions](http://chaijs.com/api/bdd/).

## Installation

You can check out the [Postman BDD documentation](https://github.com/JamesMessinger/postman-bdd) for its installation instructions.
Importing the Common API testscripts file is similar to installing Postman BDD.

**1. Download the Common API tests**
Create a `GET` request in Postman and point it to the following URL:<br>
[`https://raw.githubusercontent.com/digipolisantwerp/common-api-tests_js/master/common-tests.js`](https://raw.githubusercontent.com/digipolisantwerp/common-api-tests_js/master/common-tests.js)

**2. Install Postman BDD**
In the same request that you created in Step 1, go to the "Tests" tab and add the following script:

```javascript
// "install" Postman BDD
postman.setGlobalVariable('commonTests', responseBody);
```

## Usage

### API

| Name         | Default value | Description |
| -----------  | ------ | -------------------------- |
| `Status code: integer;` | - | The status code that should be returned in the response. |
| `Content-Type: string;` | - | The Content-Type that should be returned in the response. |
| `Response time: integer;` | - | The maximum response time in milliseconds. |
| `Json scheme: object;` | - | The jsonScheme that should be returned in the response. |

### Example

```javascript
// "import" Global variable commonTests in your testscript
eval(globals.commonTests);

// "add" the common test to your testscript
describe('GET ' + environment.url + '/testapi', () => {
  //commontest without scheme
  commonTest(200, "application/json; charset=utf-8", 500);
  //commontest with json scheme
  commonTestWithScheme(200, "application/json; charset=utf-8", 500, jsonscheme);
  // "add" the rest of your testscript
  ...
}
```

## Questions

[Contact us](mailto:DA_ACPaaS_testing@digipolis.be) if you have any questions or feedback.

## Changelog

Detailed changes for each release are documented in the [changelog](./CHANGELOG.md).

## Contributing

Your contributions are most welcome as pull requests, both code changes and documentation updates.

## License

[MIT](./LICENSE)

Copyright (c) 2019-present, Digipolis
