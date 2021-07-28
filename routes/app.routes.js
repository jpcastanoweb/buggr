const router = require("express").Router()
const appController = require("./../controllers/app.controller")
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")
const { inApp, outApp } = require("./../middleware/header-setter")

/* Dashboard */
router.get("/", isLoggedIn, inApp, appController.dashboard)

/* Profile */
router.get("/myprofile", isLoggedIn, inApp, appController.myprofile)
router.get("/myprofile/edit", isLoggedIn, inApp, appController.editMyProfile)
router.post("/myprofile/edit", isLoggedIn, appController.submitEditMyProfile)

/* Organization */
router.get("/createorg", isLoggedIn, inApp, appController.createOrg)
router.get("/org/:orgId", isLoggedIn, inApp, appController.org)
router.get("/org/:orgId/edit", isLoggedIn, inApp, appController.editOrg)

router.post("/createorg", isLoggedIn, appController.submitCreateOrg)
router.post("/org/:orgId/edit", isLoggedIn, appController.submitEditOrg)
router.post("/org/:orgId/delete", isLoggedIn, appController.submitDeleteOrg)

/* Project */
router.get("/projects", isLoggedIn, inApp, appController.projects)
router.get("/createproject", isLoggedIn, inApp, appController.createProject)
router.get("/project/:projectId", isLoggedIn, inApp, appController.project)
router.get(
  "/project/:projectId/edit",
  isLoggedIn,
  inApp,
  appController.editProject
)

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
router.get("/opportunities", isLoggedIn, inApp, appController.opportunities)
router.get("/createopp", isLoggedIn, inApp, appController.createOpp)
router.get("/opp/:oppId", isLoggedIn, inApp, appController.opp)
router.get("/opp/:oppId/edit", isLoggedIn, inApp, appController.opp)

router.post("/createopp", isLoggedIn, inApp, appController.submitCreateOpp)
router.post("/opp/:oppId/edit", isLoggedIn, inApp, appController.submitEditOpp)
router.post("/opp/:oppId/opp", isLoggedIn, inApp, appController.submitDeleteOpp)

module.exports = router
