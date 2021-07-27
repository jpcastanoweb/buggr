const router = require("express").Router()
const authController = require("./../controllers/auth.controller")
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")
const { inApp, outApp } = require("./../middleware/header-setter")

/* Sign Up */
// router.get("/signup", authController.signup)
router.post("/signup", isLoggedOut, authController.submitSignup)

/* Log In */
router.get("/login", isLoggedOut, outApp, authController.login)
router.post("/login", isLoggedOut, authController.submitLogin)

/* Log Out */
router.get("/logout", isLoggedIn, outApp, authController.logout)
// router.post("/logout", authController.logout)

module.exports = router
