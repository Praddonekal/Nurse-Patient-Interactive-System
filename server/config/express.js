let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

//modules for authentication
let session = require("express-session");
// let passport = require("passport");
// let localSrategy = require("passport-local");
let bodyParser = require("body-parser");
let cors = require("cors");

let Resolver = require("../graphql/resolvers/index.js");
let Schema = require("../graphql/Schema/index.js");

let verifyToken = require("../helpers/jwt.js");
let expressGraphql = require("express-graphql");

let app = express();

//the process.env property allows you to access predefined environment letiables
//such as NODE_ENV
// Use the 'NDOE_ENV' letiable to activate the 'morgan' logger or 'compress' middleware
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(compress());
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//setup express session
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(cookieParser("SomeSecret"));

app.use(verifyToken);

app.use(
  "/graphql",
  expressGraphql.graphqlHTTP({
    schema: Schema,
    rootValue: Resolver,
    graphiql: true,
  })
);

//initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

//require("./passport")(passport);

//app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
