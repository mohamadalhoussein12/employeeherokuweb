/**
 * [ServerError Custom Error Class]
 * @extends Error
 */
class ServerError extends Error {
  constructor(params) {
    super(params);
    this.message = params.message;
    this.code = params.code;
  }
  
  getCode() {
    return this.code;
  }
}

module.exports = ServerError;
