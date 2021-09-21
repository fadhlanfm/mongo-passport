const mongoose = require("mongoose")

const Product = mongoose.Schema({
  title:{
      type: String,
      required: true
  },
  price:{
      type: Number,
      required: true
  }
});

module.exports = mongoose.model("Products", Product)