const router = require("express").Router()
const homeController = require("./../controllers/home.controller")
const { inApp, outApp } = require("./../middleware/header-setter")

router.get("/", outApp, homeController.home)
router.get("/aboutus", outApp, homeController.aboutus)
router.get("/product", outApp, homeController.product)
router.get("/contactus", outApp, homeController.contactus)

module.exports = router
