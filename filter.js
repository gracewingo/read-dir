const { Transform } = require('stream')

class Filter extends Transform {

  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true
    })
  }

  _transform(chunk, encoding, next) {
    console.log(encoding)
  }

  has(value) {
    return !!value
  }
}

module.exports = Filter 