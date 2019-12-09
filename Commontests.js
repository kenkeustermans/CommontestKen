// This library provides functions that are commonly used throughout the test process.
// For more information about JSON Schema, see https://spacetelescope.github.io/understanding-json-schema/basics.html
// Negative regex values can be extended by an OR function. Example: (?!wrongvalue1|wrongvalue2|wrongvalueN)

/**
 * Checks commonly used variables.
 *
 * @param {number} statusCode - status code of the response
 * @param {string} contentType - content type of the response
 * @param {Object} jsonSchema - JSON schema of the response
 * @param {string} location - location of the source
 */
function testCommon(statusCode, contentType, jsonSchema, location) {
	logResponseBody();
	statusCode && checkStatusCode(statusCode);
	contentType && checkContentType(contentType);
	jsonSchema && checkJSONSchema(jsonSchema);
	location && checkLocation(location);
}

/**
 * Executes functions testCommon and checkTime.
 *
 * @param {number} statusCode - status code of the response
 * @param {number} time - elapsed time of the response
 * @param {string} contentType - content type of the response
 * @param {Object} jsonSchema - JSON schema of the response
 * @param {string} location - location of the source
 */
function testCommonAndTime(statusCode, time, contentType, jsonSchema, location) {
	testCommon(statusCode, contentType, jsonSchema, location);
	time && checkTime(time);
}

/**
 * Logs the response body of the request. This function is for test automation logging purposes.
 */
function logResponseBody() {
	// The 'it' function is being used because a console log results in an unreadable small vertical text. This method will count as an extra test.
	responseBody && it('response body: ' + responseBody, () => {});
}

/**
 * Converts time to the correct multiple.
 *
 * @param {number} time - time in milliseconds
 * @throws {TypeError} Parameter must be a number
 */
function convertTime(time) {
	if (typeof time === 'number') {
		return time >= 1000 ? time/1000 + 's' : time + 'ms';
	} else {
		throw new TypeError('Parameter value must be of type "number" for function "convertTime(time)"');
	}
}

/**
 * Delays for the set amount of time.
 *
 * @param {number} time - time interval in milliseconds
 * @throws {TypeError} Parameter must be a number
 */
function delayTime(time) {
	if (typeof time === 'number') {
		console.log('Delaying for ' + convertTime(time) + '...');
		setTimeout(() => console.log('Delay finished'), time);
	} else {
		throw new TypeError('Parameter value must be of type "number" for function "delayTime(time)"');
	}
}

/**
 * Generates a random number. Positive and negative numbers are allowed.
 *
 * @param {number} min - minimum number (included)
 * @param {number} max - maximum number (included)
 * @returns {number} Random number that ranges from min to max
 * @throws {TypeError} Parameters must be numbers
 */
function generateNumber(min, max) {
	if (typeof min === 'number' && typeof max === 'number') {
		if (min <= max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		} else {
			return Math.floor(Math.random() * (min - max + 1) + max);
		}
	} else {
		throw new TypeError('Parameter values must be of type "number" for function "generateNumber(min, max)"');
	}
}

/**
 * Generates a random string of characters.
 *
 * @param {number} length - Amount of characters to be generated
 * @returns {string} Text with random characters
 * @throws {TypeError} Parameter must be a number
 */
function generateString(length) {
	if (typeof length === 'number') {
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
			text = '';
		for (var i = 0; i < length; i++) {
			text += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return text;
	} else {
		throw new TypeError('Parameter value must be of type "number" for function "generateString(length)"');
	}
}

/**
 * Gets the index of the first object in an array that matches the given property and value.
 *
 * @param {Array.<Object>} array - The array to be searched
 * @param {string} property - The name of the property to be matched
 * @param {*} value - The value of the property to be matched
 * @returns {number} Index of the first matching object or -1 if there is no match
 * @throws {TypeError} Parameters must be an array, string, any
 */
function getIndexObjectInArray(array, property, value) {
	if (Array.isArray(array) && array.every(item => typeof item === 'object') && typeof property === 'string') {
		return array.findIndex(item => item[property] === value);
	} else {
		throw new TypeError('Parameter values must be of type "Array.<Object>, string, any" for function "getIndexObjectInArray(array, property, value)"');
	}
}

/**
 * Checks if the service responds within the required response time.
 *
 * @param {number} time - elapsed time of the response
 * @throws {RangeError} Parameter must be a strictly positive number
 */
function checkTime(time) {
	if (time > 0) {
		it('should respond within ' + convertTime(time), () => {
			response.time.should.be.below(time);
		});
	} else {
		throw new RangeError('Parameter value must be a strictly positive number for function "checkTime(time)"');
	}
}

/**
 * Checks if the service responds with the correct status.
 *
 * @param {number} statusCode - code of the response status
 * @throws {RangeError} Parameter must be an existing status code number
 */
function checkStatusCode(statusCode) {
	switch (true) {
		case (100 <= statusCode && statusCode <= 199):
			it('should be an information response', () => {
				response.should.have.status(statusCode);
			});
			break;
		case (200 <= statusCode && statusCode <= 299):
			it('should be a successful response', () => {
				response.should.have.status(statusCode);
			});
			break;
		case (300 <= statusCode && statusCode <= 399):
			it('should be a redirection response', () => {
				response.should.have.status(statusCode);
			});
			break;
		case (400 <= statusCode && statusCode <= 499):
			it('should be a client error response', () => {
				response.should.have.status(statusCode);
			});
			break;
		case (500 <= statusCode && statusCode <= 599):
			it('should be a server error response', () => {
				response.should.have.status(statusCode);
			});
			break;
		default:
			throw new RangeError('Parameter value must be an existing status code number for function "checkStatusCode(statusCode)"');
	}
}

/**
 * Checks if the service responds with the correct content type.
 *
 * @param {string} contentType - type of the response body
 */
function checkContentType(contentType) {
	it('should be of type "' + contentType + '"', () => {
		response.type.should.equal(contentType);
	});
}

/**
 * Checks if the response body is structured conform the defined JSON schema.
 *
 * @param {Object} jsonSchema - JSON schema of the response body
 * @throws {TypeError} Parameter must be a JSON schema object
 */
function checkJSONSchema(jsonSchema) {
	if (typeof jsonSchema == 'object') {
		it('should match against the JSON schema', () => {
			response.body.should.have.schema(jsonSchema);
		});
	} else {
		throw new TypeError('Parameter value must be a JSON schema object for function "checkJSONSchema(jsonSchema)"');
	}
}

/**
 * Checks if the service responds with the correct location.
 *
 * @param {string} location - location of the source
 */
function checkLocation(location) {
	it('should return the location "' + location + '"', () => {
		response.should.have.header('Location', location);
	});
}

/**
 * Gets the regex pattern for GUID's
 *
 * @returns {string} regex pattern string for GUID's
 */
function getRegexGUID() {
	return "^(?!00000000-0000-0000-0000-000000000000)([0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12})$";
}

/**
 * Gets the regex pattern for ISO datetimes
 *
 * @returns {string} regex pattern string for ISO datetimes
 */
function getRegexISODateTime() {
	return "^(?!0001-01-01T00:00:00Z)([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.?[0-9]*Z)$";
}

/**
 * Gets the regex pattern for URL's
 *
 * @returns {string} regex pattern string for URL's
 */
function getRegexURL() {
	return "^https?://[0-9a-zA-Z-]+\\.?[0-9a-zA-Z-]+";
}

/**
 * Gets the JSON schema for HAL. The schema does not check specific resource content but only the basic HAL structure.
 *
 * @param {Object} schemaResourceItems - schema of the resource items
 * @returns {Object} JSON schema object for HAL
 */
function getSchemaHAL(schemaResourceItems = {}) {
	return {
		"type": "object",
		"required": [ "_links", "_embedded", "_page" ],
		"properties": {
			"_links": {
				"type": "object",
				"required": [ "self", "next", "previous", "first", "last" ],
				"properties": {
					"self": {
						"type": "object",
						"required": [ "href" ],
						"properties": {
							"href": { "type": "string", "pattern": getRegexURL() }
						}
					},
					"next": {
						"type": [ "object", "null" ],
						"required": [ "href" ],
						"properties": {
							"href": { "type": "string", "pattern": getRegexURL() }
						}
					},
					"previous": {
						"type": [ "object", "null" ],
						"required": [ "href" ],
						"properties": {
							"href": { "type": "string", "pattern": getRegexURL() }
						}
					},
					"first": {
						"type": "object",
						"required": [ "href" ],
						"properties": {
							"href": { "type": "string", "pattern": getRegexURL() }
						}
					},
					"last": {
						"type": "object",
						"required": [ "href" ],
						"properties": {
							"href": { "type": "string", "pattern": getRegexURL() }
						}
					}
				}
			},
			"_embedded": {
				"type": "object",
				"required": [ "resourceList" ],
				"properties": {
					"resourceList": {
						"type": "array",
						"items": schemaResourceItems
					}
				}
			},
			"_page": {
				"type": "object",
				"required": [ "size", "number" ],
				"properties": {
					"size": { "type": "number", "minimum": 0, "multipleOf": 1 },
					"totalElements": { "type": "number", "minimum": 0, "multipleOf": 1 },
					"totalPages": { "type": "number", "minimum": 0, "multipleOf": 1 },
					"number": { "type": "number", "minimum": 0, "multipleOf": 1 }
				}
			}
		}
	};
}
