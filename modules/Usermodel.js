const mongoose = require("mongoose");

let location = new mongoose.Schema({
    latitude: String,
    longitude: String,
})

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  isCardSaved: Boolean,
  cardInfo: {
    cardNumber: String,
    cardHolderName: String,
    expireDate: String,
    cvv: Number
  },
  userId:  String,
  timestamps: { type: Date, default: Date.now },
  location: location
});

module.exports = mongoose.model("User", userSchema);
// {
// "username": "",
// "email": "",
// "mobile": "",
// "password": "",
// "isActive": "",
// "isDeleted": ""
// }
