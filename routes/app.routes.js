const router = require("express").Router()
const appController = require("./../controllers/app.controller")
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")
const { inApp, outApp } = require("./../middleware/header-setter")

/* App Default -> Opportunities */
router.get("/", isLoggedIn, inApp, appController.customers)

/* Profile */
router.get("/myprofile", isLoggedIn, inApp, appController.myprofile)
router.get("/myprofile/edit", isLoggedIn, inApp, appController.editMyProfile)
router.post("/myprofile/edit", isLoggedIn, appController.submitEditMyProfile)

/* Organization */
router.get("/createorg", isLoggedIn, inApp, appController.createOrg)
router.get("/org", isLoggedIn, inApp, appController.org)
router.get("/org/edit", isLoggedIn, inApp, appController.editOrg)

router.post("/createorg", isLoggedIn, appController.submitCreateOrg)
router.post("/org/edit", isLoggedIn, appController.submitEditOrg)
router.post("/org/delete", isLoggedIn, appController.submitDeleteOrg)

/* Project */
router.get("/projects", isLoggedIn, inApp, appController.projects)
router.get("/createproject", isLoggedIn, inApp, appController.createProject)
router.get("/projects/:projectId", isLoggedIn, inApp, appController.project)
router.get(
  "/projects/edit/:projectId",
  isLoggedIn,
  inApp,
  appController.editProject
)

router.post("/createproject", isLoggedIn, appController.submitCreateProject)
router.post(
  "/projects/edit/:projectId",
  isLoggedIn,
  appController.submitEditProject
)
router.post(
  "/projects/delete/:projectId",
  isLoggedIn,
  appController.submitDeleteProject
)

/* Opportunity */
router.get("/opportunities", isLoggedIn, inApp, appController.opportunities)
router.get("/createopp", isLoggedIn, inApp, appController.createOpp)
router.get("/opps/:oppId", isLoggedIn, inApp, appController.opp)
router.get("/opps/edit/:oppId/", isLoggedIn, inApp, appController.editOpp)

router.post("/createopp", isLoggedIn, inApp, appController.submitCreateOpp)
router.post(
  "/opps/edit/:oppId/",
  isLoggedIn,
  inApp,
  appController.submitEditOpp
)
router.post(
  "/opps/delete/:oppId",
  isLoggedIn,
  inApp,
  appController.submitDeleteOpp
)

/* Customers */
router.get("/customers", isLoggedIn, inApp, appController.customers)
router.get("/newcustomer", isLoggedIn, inApp, appController.newCustomer)
router.get("/customers/:customerId", isLoggedIn, inApp, appController.customer)
router.get(
  "/customers/edit/:customerId",
  isLoggedIn,
  inApp,
  appController.editCustomer
)

router.post("/newcustomer", isLoggedIn, inApp, appController.submitNewCustomer)
router.post(
  "/customers/edit/:customerId",
  isLoggedIn,
  inApp,
  appController.submitEditCustomer
)
router.post(
  "/customers/delete/:customerId/",
  isLoggedIn,
  inApp,
  appController.submitDeleteCustomer
)

/* convert from opp to project */
router.post(
  "/convert/:oppId",
  isLoggedIn,
  inApp,
  appController.convertOppToProject
)

module.exports = router
