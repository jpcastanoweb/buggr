const Organization = require("./../models/Organization.model")
const Project = require("./../models/Project.model")

/* GET requests */
exports.dashboard = async (req, res, next) => {}
exports.myprofile = async (req, res, next) => {}
exports.editMyProfile = async (req, res, next) => {}
exports.createOrg = async (req, res, next) => {}
exports.org = async (req, res, next) => {}
exports.editOrg = async (req, res, next) => {}
exports.deleteOrg = async (req, res, next) => {}
exports.createProject = async (req, res, next) => {}
exports.project = async (req, res, next) => {}
exports.editProject = async (req, res, next) => {}
exports.deleteProject = async (req, res, next) => {}

/* POST requests */
exports.submitEditMyProfile = async (req, res, next) => {}
exports.submitCreateOrg = async (req, res, next) => {}
exports.submitEditOrg = async (req, res, next) => {}
exports.submitDeleteOrg = async (req, res, next) => {}
exports.submitCreateProject = async (req, res, next) => {}
exports.submitEditProject = async (req, res, next) => {}
exports.submitDeleteProject = async (req, res, next) => {}
