const Organization = require("./../models/Organization.model")
const Project = require("./../models/Project.model")
const User = require("./../models/User.model")

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
  res.render("app/createOrg")
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
exports.submitEditMyProfile = async (req, res, next) => {
  const { username, email, firstName, lastName, role } = req.body
  console.log(username, email, firstName, lastName, role)

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        username,
        email,
        firstName,
        lastName,
        role,
      },
      {
        new: true,
      }
    )

    console.log("Updated user: ", updatedUser)
    req.session.currentUser = updatedUser
    res.redirect("/app/myprofile")
  } catch (error) {
    console.log(error.message)
  }
}

exports.submitCreateOrg = async (req, res, next) => {
  const { name } = req.body

  try {
    const newOrg = await Organization.create({
      name,
      admin: req.session.currentUser._id,
      projects: [],
      users: [req.session.currentUser._id],
      number_of_projects: 0,
    })

    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { $push: { organizations: newOrg._id } },
      { new: true }
    )

    console.log("New Org ", newOrg)
    console.log("Updated User", updatedUser)

    req.session.currentUser = updatedUser
    req.session.currentOrg = newOrg
    res.redirect("/app")
  } catch (error) {
    console.log("Error creating new org", error)
  }
}
exports.submitEditOrg = async (req, res, next) => {}
exports.submitDeleteOrg = async (req, res, next) => {}
exports.submitCreateProject = async (req, res, next) => {}
exports.submitEditProject = async (req, res, next) => {}
exports.submitDeleteProject = async (req, res, next) => {}
