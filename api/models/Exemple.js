// Import dependencies
const mongoose = require('mongoose')

// Create schema
const thingSchema = mongoose.Schema({
  // title: {
  //   type: String,
  //   required: true,
  // },
})

// Export model
module.exports = mongoose.model('Thing', thingSchema)
