const router = require("express").Router()
const appController = require("./../controllers/app.controller")
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")
const { inApp, outApp } = require("./../middleware/header-setter")

/* App Default -> Opportunities */
router.get("/", isLoggedIn, inApp, appController.opportunities)

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
router.get("/projects/:projectId", isLoggedIn, inApp, appController.project)
router.get(
  "/projects/:projectId/edit",
  isLoggedIn,
  inApp,
  appController.editProject
)

router.post("/createproject", isLoggedIn, appController.submitCreateProject)
router.post(
  "/projects/:projectId/edit",
  isLoggedIn,
  appController.submitEditProject
)
router.post(
  "/projects/:projectId/delete",
  isLoggedIn,
  appController.submitDeleteProject
)

/* Opportunity */
router.get("/opportunities", isLoggedIn, inApp, appController.opportunities)
router.get("/createopp", isLoggedIn, inApp, appController.createOpp)
router.get("/opps/:oppId", isLoggedIn, inApp, appController.opp)
router.get("/opps/:oppId/edit", isLoggedIn, inApp, appController.editOpp)

router.post("/createopp", isLoggedIn, inApp, appController.submitCreateOpp)
router.post("/opps/:oppId/edit", isLoggedIn, inApp, appController.submitEditOpp)
router.post(
  "/opps/:oppId/delete",
  isLoggedIn,
  inApp,
  appController.submitDeleteOpp
)

/* Customers */
router.get("/customers", isLoggedIn, inApp, appController.customers)
router.get("/newCustomer", isLoggedIn, inApp, appController.newCustomer)
router.get("/customers/:customerId", isLoggedIn, inApp, appController.customer)
router.get(
  "customers/:customerId/edit",
  isLoggedIn,
  inApp,
  appController.editCustomer
)

router.post("/newCustomer", isLoggedIn, inApp, appController.submitNewCustomer)
router.post(
  "/customers/:customerId/edit",
  isLoggedIn,
  inApp,
  appController.submitEditCustomer
)
router.post(
  "/customers/:customerId/delete",
  isLoggedIn,
  inApp,
  appController.submitDeleteCustomer
)
module.exports = router
