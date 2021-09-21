const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

class UserController {
  static async signUp (req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User(req.body)

    try {
      const savedUser = await user.save()
      res.status(201).json(savedUser)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async signIn (req, res) {
    let foundUser = await User.findOne({ username: req.body.username }).exec();
    if (foundUser) {
      //cek password bener apa engga
      let insertedPw = req.body.password
      let isPwCorrect = bcrypt.compareSync(insertedPw, foundUser.password);
      if (isPwCorrect) {
        // kasih token
        var token = jwt.sign({foundUser}, 'shhhhh');
        res.status(200).json({ message: "login success", token })
      }
    }
    res.json({ message: "wrong username or password"})
  }
}

module.exports = UserController;