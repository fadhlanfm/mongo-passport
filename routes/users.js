const mongoose = require('mongoose');
const router = require('express').Router();   
const passport = require('passport');
const UserController = require("../controllers/users")
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */
// TODO
router.get('/protected', passport.authenticate("jwt", { session: false }), (req, res, next) => {
  console.log("masuk protected")
  res.json({ message: "authorized"})
});

// TODO
router.post('/login', UserController.signIn);

// TODO
router.post('/register', UserController.signUp);

module.exports = router;