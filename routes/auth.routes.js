const router = require("express").Router()
const authController = require("./../controllers/auth.controller")

/* Sign Up */
router.get("/signup", authController.signup)
router.post("/signup", authController.submitSignup)

/* Log In */
router.get("/login", authController.login)
router.post("/login", authController.submitLogin)

/* Log Out */
// router.post("/logout", authController.logout)

module.exports = router
