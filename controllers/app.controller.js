const Organization = require("./../models/Organization.model")
const Project = require("./../models/Project.model")

/* GET requests */
exports.dashboard = async (req, res, next) => {
  res.render("app/dashboard")
}
exports.myprofile = async (req, res, next) => {
  res.render("app/myprofile")
}
exports.editMyProfile = async (req, res, next) => {
  res.render("app/editMyProfile")
}
exports.createOrg = async (req, res, next) => {
  res.render("app/newOrg")
}
exports.org = async (req, res, next) => {
  res.render("app/singleOrg")
}
exports.editOrg = async (req, res, next) => {
  res.render("app/editOrg")
}
exports.createProject = async (req, res, next) => {
  res.render("app/newProject")
}
exports.project = async (req, res, next) => {
  res.render("app/singleProject")
}
exports.editProject = async (req, res, next) => {
  res.render("app/editProject")
}

/* POST requests */
exports.submitEditMyProfile = async (req, res, next) => {}
exports.submitCreateOrg = async (req, res, next) => {}
exports.submitEditOrg = async (req, res, next) => {}
exports.submitDeleteOrg = async (req, res, next) => {}
exports.submitCreateProject = async (req, res, next) => {}
exports.submitEditProject = async (req, res, next) => {}
exports.submitDeleteProject = async (req, res, next) => {}
