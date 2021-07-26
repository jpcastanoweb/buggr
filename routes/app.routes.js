const router = require("express").Router()
const appController = require("./../controllers/app.controller")

/* Dashboard */
router.get("/", appController.dashboard)

/* Profile */
router.get("/myprofile", appController.myprofile)
router.get("/myprofile/edit", appController.editMyProfile)
router.post("/myprofile/edit", appController.submitEditMyProfile)

/* Organization */
router.get("/createorg", appController.createOrg)
router.get("/:orgId", appController.org)
router.get("/:orgId/edit", appController.editOrg)
router.get("/:orgId/delete", appController.deleteOrg)

router.post("/createorg", appController.submitCreateOrg)
router.post("/:orgId/edit", appController.submitEditOrg)
router.post("/:orgId/delete", appController.submitDeleteOrg)

/* Project */
router.get("/createproject", appController.createProject)
router.get("/:projectId", appController.project)
router.get("/:projectId/edit", appController.editProject)
router.get("/:projectId/delete", appController.deleteProject)

router.post("/createproject", appController.submitCreateProject)
router.post("/:projectId/edit", appController.submitEditProject)
router.post("/:projectId/delete", appController.submitDeleteProject)

module.exports = router
