const router = require("express").Router()
const homeController = require("./../controllers/home.controller")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index")
})

router.get("/aboutus", homeController.aboutus)
router.get("/product", homeController.product)
router.get("/contactus", homeController.contactus)

module.exports = router
