const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Import Schema
const User = require("../modules/Usermodel");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//Register
router.post("/register", async (req, res) => {
  // To check email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    password: hashPassword,
    isActive: req.body.isActive,
    isDeleted: req.body.isDeleted,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  try {
    const savedUser = await user.save();
    // res.send(savedUser)
    var ID = savedUser._id.toString();
    var userId = ID.slice(ID.length - 5);

    User.findOneAndUpdate({ _id: savedUser._id }, { userId }, function(
      err,
      data
    ) {
      if (err) throw err;
      else {
        return res.send(data);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  // To check email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");
  // Check Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");
  // Create and assign a Token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.header("auth-token", token).send(token);
  // res.send('Logged In!!!!');
});

//Get All Users

router.get("/getall", async (req, res) => {
  // res.send('we are on posts');
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// Specific user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
