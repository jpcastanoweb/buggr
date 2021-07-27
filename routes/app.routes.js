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
router.get("/org/:orgId", isLoggedIn, appController.org)
router.get("/org/:orgId/edit", isLoggedIn, appController.editOrg)

router.post("/createorg", isLoggedIn, appController.submitCreateOrg)
router.post("/org/:orgId/edit", isLoggedIn, appController.submitEditOrg)
router.post("/org/:orgId/delete", isLoggedIn, appController.submitDeleteOrg)

/* Project */
router.get("/createproject", isLoggedIn, appController.createProject)
router.get("/project/:projectId", isLoggedIn, appController.project)
router.get("/project/:projectId/edit", isLoggedIn, appController.editProject)

router.post("/createproject", isLoggedIn, appController.submitCreateProject)
router.post(
  "/project/:projectId/edit",
  isLoggedIn,
  appController.submitEditProject
)
router.post(
  "/project/:projectId/delete",
  isLoggedIn,
  appController.submitDeleteProject
)

/* Opportunity */
router.get("/createopp", isLoggedIn, appController.createOpp)
router.get("/opp/:oppId", isLoggedIn, appController.opp)
router.get("/opp/:oppId/edit", isLoggedIn, appController.opp)

router.post("/createopp", isLoggedIn, appController.submitCreateOpp)
router.post("/opp/:oppId/edit", isLoggedIn, appController.submitEditOpp)
router.post("/opp/:oppId/opp", isLoggedIn, appController.submitDeleteOpp)

module.exports = router
