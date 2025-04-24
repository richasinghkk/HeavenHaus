//    const User=require("../models/user");
   
//    module.exports.signup=async (req, res, next) => {
//        try {
//            const { username, email, password } = req.body;
//            const newUser = new User({ email, username });
//            const registeredUser = await User.register(newUser, password);
   
//            req.login(registeredUser, (err) => {
//                if (err) {
//                    return next(err);
//                }
//                req.flash("success", "Welcome to Wander!");
//                res.redirect("/listings");
//            });
   
//        } catch (e) {
//            req.flash("error", e.message);
//            res.redirect("/signup");
//        }
//    };

//    module.exports.renderLoginForm=(req, res) => {
//     res.render("users/login.ejs");
//    };

//    module.exports.login= async (req, res) => {
//     req.flash("success", "Welcome back to Wander!");
//     const redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// };

// module.exports.logout=(req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
//         req.flash("success", "You are logged out!");
//         res.redirect("/listings");
//     });
//     };

// module.exports.renderSignupForm = (req, res) => {
//     res.render("users/signup");
// };

// module.exports.signup = async (req, res) => {
//     // Your signup logic here
// };

// module.exports.renderLoginForm = (req, res) => {
//     res.render("users/login");
// };

// module.exports.login = (req, res) => {
//     req.flash("success", "Welcome back!");
//     const redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// };

// module.exports.logout = (req, res, next) => {
//     req.logout(function (err) {
//         if (err) return next(err);
//         req.flash("success", "Logged you out!");
//         res.redirect("/listings");
//     });
// };
const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wander!");
            res.redirect("/listings");
        });

    } catch (e) {
        console.log("Signup error:", e);
        req.flash("error", e.message || "Something went wrong");
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to Wander!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
};
