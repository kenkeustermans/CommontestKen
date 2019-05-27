/*!
 * CommonTests ACPaaS API (May 26th 2019)
 * 
 * https://github.com/kenkeustermans/CommontestKen
 *
 * @author  Ken Keustermans
 */
function commonTest(responseCode, contentType, time) {
  if (responseCode >= 200 && responseCode <= 399) {
      it('should be a successful response', () => {
          response.should.have.status(responseCode);
      });
  } else if (responseCode >= 400 && responseCode <= 599) {
      it('should be a unsuccessful response', () => {
          response.should.have.status(responseCode);
      });
  }

  if (time){
      it('should respond in a timely manner', () => {
          response.time.should.be.below(time);
      });
  }

  if (contentType){
      it('should return ' + contentType, () => {
          response.should.have.header('Content-Type', contentType);
      });
  }
}
function commonTestWithoutTime(responseCode, contentType,) {
    if (responseCode >= 200 && responseCode <= 399) {
        it('should be a successful response', () => {
            response.should.have.status(responseCode);
        });
    } else if (responseCode >= 400 && responseCode <= 599) {
        it('should be a unsuccessful response', () => {
            response.should.have.status(responseCode);
        });
    }
    
    if (contentType){
        it('should return ' + contentType, () => {
            response.should.have.header('Content-Type', contentType);
        });
    }
}
function commonTestWithSchema(responseCode, contentType, time, jsonSchema) {
  if (responseCode >= 200 && responseCode <= 399) {
      it('should be a successful response', () => {
          response.should.have.status(responseCode);
      });
  } else if (responseCode >= 400 && responseCode <= 599) {
      it('should be a unsuccessful response', () => {
          response.should.have.status(responseCode);
      });
  }

  if (time){
      it('should respond in a timely manner', () => {
          response.time.should.be.below(time);
      });
  }

  if (contentType){
      it('should return ' + contentType, () => {
          response.should.have.header('Content-Type', contentType);
      });
  }
  
  if (jsonSchema){
    it('should match against a JSON Schema', () => {
    // For more information about JSON Schema, see https://spacetelescope.github.io/understanding-json-schema/basics.html
        response.body.should.have.schema(jsonSchema);
    });
  }
}
