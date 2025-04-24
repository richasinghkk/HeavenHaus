
if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/user.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



const dbUrl=process.env.ATLASDB_URL;
// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to DB");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    }
}
main();

// View engine and middlewares
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});


// Session configuration
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};



app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global variables for all views
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});



// Mount routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Handle 404
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


// Error handler middleware
app.use((err, req, res, next) => {
     const { statusCode = 500 } = err;
    const message = err.message || "Something went wrong!"; // Fallback message
     res.status(statusCode).render("error", { err, message }); // Pass both err and message
    });

// Start the server
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});