const Organization = require("./../models/Organization.model")
const Project = require("./../models/Project.model")
const Opportunity = require("./../models/Opportunity.model")
const User = require("./../models/User.model")

/* GET requests */
exports.dashboard = async (req, res, next) => {
  try {
    const orgs = []

    for (let i = 0; i < req.session.currentUser.organizations.length; i++) {
      const org = await Organization.findById(
        req.session.currentUser.organizations[i]
      )

      if (req.session.currentOrg._id.toString() !== org._id.toString()) {
        orgs.push({
          name: org.name,
          id: org._id,
        })
      }
    }

    const oppIds = await Opportunity.find({
      belongsTo: req.session.currentOrg._id,
    })

    const projectIds = await Project.find({
      belongsTo: req.session.currentOrg._id,
    })

    return res.render("app/dashboard", {
      projects: projectIds,
      opps: oppIds,
      userOrgs: orgs,
    })
  } catch (error) {
    console.log("Error loading dashboard", error)
  }
}
exports.myprofile = async (req, res, next) => {
  return res.render("app/myprofile")
}
exports.editMyProfile = async (req, res, next) => {
  return res.render("app/editMyProfile")
}
exports.createOrg = async (req, res, next) => {
  return res.render("app/createOrg")
}
exports.org = async (req, res, next) => {
  return res.render("app/singleOrg")
}
exports.editOrg = async (req, res, next) => {
  return res.render("app/editOrg")
}
exports.createProject = async (req, res, next) => {
  return res.render("app/newProject")
}
exports.project = async (req, res, next) => {
  return res.render("app/singleProject")
}
exports.editProject = async (req, res, next) => {
  return res.render("app/editProject")
}
exports.createOpp = async (req, res, next) => {
  return res.render("app/newOpp")
}
exports.opp = async (req, res, next) => {
  return res.render("app/singleOpp")
}
exports.editOpp = async (req, res, next) => {
  return res.render("app/editOpp")
}

/* POST requests */
exports.submitEditMyProfile = async (req, res, next) => {
  const { username, email, firstName, lastName, role } = req.body

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

    req.session.currentUser = updatedUser
    return res.redirect("/app/myprofile")
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
      opportunities: [],
      users: [req.session.currentUser._id],
      number_of_projects: 0,
      number_of_opportunities: 0,
    })

    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { $push: { organizations: newOrg._id } },
      { new: true }
    )

    req.session.currentUser = updatedUser
    req.session.currentOrg = newOrg
    return res.redirect("/app")
  } catch (error) {
    console.log("Error creating new org", error)
  }
}
exports.submitEditOrg = async (req, res, next) => {}
exports.submitDeleteOrg = async (req, res, next) => {}
exports.submitCreateProject = async (req, res, next) => {
  //create new project
  const {
    title,
    startDate,
    goalDate,
    dollarValue,
    contactFullName,
    contactPhoneNumber,
    contactEmailAddress,
  } = req.body

  try {
    const newProject = await Project.create({
      title,
      belongsTo: req.session.currentOrg._id,
      startDate,
      goalDate,
      currentStage: "New",
      dollarValue,
      contactFullName,
      contactPhoneNumber,
      contactEmailAddress,
      posts: [],
      documents: [],
    })

    const currentOrg = await Organization.findByIdAndUpdate(
      req.session.currentOrg,
      { $push: { projects: newProject._id } },
      { new: true }
    )

    //updating currentOrg in session
    req.session.currentOrg = currentOrg

    //redirect to app dashboard
    return res.redirect("/app")
  } catch (error) {
    console.log("Error while creating project", error)
  }
}
exports.submitEditProject = async (req, res, next) => {}
exports.submitDeleteProject = async (req, res, next) => {}
exports.submitCreateOpp = async (req, res, next) => {
  //create new project
  const {
    title,
    openedDate,
    closeDate,
    dollarValue,
    contactFullName,
    contactPhoneNumber,
    contactEmailAddress,
  } = req.body

  try {
    const newOpp = await Opportunity.create({
      title,
      belongsTo: req.session.currentOrg._id,
      openedDate,
      closeDate,
      currentStage: "New",
      dollarValue,
      contactFullName,
      contactPhoneNumber,
      contactEmailAddress,
      posts: [],
      documents: [],
    })

    const currentOrg = await Organization.findByIdAndUpdate(
      req.session.currentOrg,
      { $push: { opportunities: newOpp._id } },
      { new: true }
    )

    //updating currentOrg in session
    req.session.currentOrg = currentOrg

    //redirect to app dashboard
    return res.redirect("/app")
  } catch (error) {
    console.log("Error while creating project", error)
  }
}
exports.submitEditOpp = async (req, res, next) => {}
exports.submitDeleteOpp = async (req, res, next) => {}
