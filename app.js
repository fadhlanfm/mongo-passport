const express = require("express")
const app = express()

// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");

// const optSwagger = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: {
// 			title: "Library API",
// 			version: "1.0.0",
// 			description: "A simple Express Library API",
// 		},
// 		servers: [
// 			{
// 				url: "http://localhost:3009",
// 			},
// 		],
// 	},
// 	apis: ["./routes/*.js"],
// };
// console.log("masuk")
// const specsSwagger = swaggerJsDoc(optSwagger);
// app.get("/api-docs", function(){
//   console.log("sdlfkj")
// });

const passport = require('passport');

// Pass the global passport object into the configuration function
// require('./config/passport')(passport);
const User = require("./models/users")
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromHeader("token"),
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "shhhhh",
  // algorithms: ['RS256']
};
// var opts = {}
// opts.jwtFromRequest = xtractJwt.fromHeader("token");
// opts.secretOrKey = "shhhhh";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ _id: jwt_payload.foundUser._id }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// This will initialize the passport object on every request
app.use(passport.initialize());

const bodyParser = require("body-parser")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const mongoose = require("mongoose")

let connOpt = {}
mongoose.connect("mongodb://localhost:27017/indoapril", connOpt)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("db connected"))

const routeProducts = require("./routes/products")
const routeUsers = require("./routes/users")
app.use('/products', routeProducts)
app.use('/users', routeUsers)

app.listen('3009', () => console.log("server 3009 is running"))