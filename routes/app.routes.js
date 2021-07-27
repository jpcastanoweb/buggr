const router = require("express").Router()
const appController = require("./../controllers/app.controller")
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")

/* Dashboard */
router.get("/", isLoggedIn, appController.dashboard)

/* Profile */
router.get("/myprofile", isLoggedIn, appController.myprofile)
router.get("/myprofile/edit", isLoggedIn, appController.editMyProfile)
router.post("/myprofile/edit", isLoggedIn, appController.submitEditMyProfile)

/* Organization */
router.get("/createorg", isLoggedIn, appController.createOrg)
router.get("/:orgId", isLoggedIn, appController.org)
router.get("/:orgId/edit", isLoggedIn, appController.editOrg)

router.post("/createorg", isLoggedIn, appController.submitCreateOrg)
router.post("/:orgId/edit", isLoggedIn, appController.submitEditOrg)
router.post("/:orgId/delete", isLoggedIn, appController.submitDeleteOrg)

/* Project */
router.get("/createproject", isLoggedIn, appController.createProject)
router.get("/:projectId", isLoggedIn, appController.project)
router.get("/:projectId/edit", isLoggedIn, appController.editProject)

router.post("/createproject", isLoggedIn, appController.submitCreateProject)
router.post("/:projectId/edit", isLoggedIn, appController.submitEditProject)
router.post("/:projectId/delete", isLoggedIn, appController.submitDeleteProject)

module.exports = router
