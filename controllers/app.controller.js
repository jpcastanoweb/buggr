const Organization = require("./../models/Organization.model")
const Project = require("./../models/Project.model")
const Opportunity = require("./../models/Opportunity.model")
const User = require("./../models/User.model")
const Customer = require("./../models/Customer.model")
//TODO Add Customers

/* GET requests */
// exports.dashboard = async (req, res, next) => {
//   try {
//     const orgs = []

//     for (let i = 0; i < req.session.currentUser.organizations.length; i++) {
//       const org = await Organization.findById(
//         req.session.currentUser.organizations[i]
//       )

//       if (req.session.currentOrg._id.toString() !== org._id.toString()) {
//         orgs.push({
//           name: org.name,
//           id: org._id,
//         })
//       }
//     }

//     const oppIds = await Opportunity.find({
//       belongsTo: req.session.currentOrg._id,
//     })

//     const projectIds = await Project.find({
//       belongsTo: req.session.currentOrg._id,
//     })

//     return res.render("app/dashboard", {
//       projects: projectIds,
//       opps: oppIds,
//       userOrgs: orgs,
//     })
//   } catch (error) {
//     console.log("Error loading dashboard", error)
//   }
// }
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
  //TODO: only if admin
  return res.render("app/editOrg")
}
exports.createProject = async (req, res, next) => {
  try {
    const customers = await Customer.find({
      belongsTo: req.session.currentOrg._id,
    })

    return res.render("app/newProject", { customers })
  } catch (error) {
    console.log("Error loading create project form", error.message)
  }
}
exports.project = async (req, res, next) => {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId)

    return res.render("app/singleProject", project)
  } catch (error) {
    console.log("Error loading specific project", error.message)
  }
}
exports.editProject = async (req, res, next) => {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId)

    return res.render("app/editProject", project)
  } catch (error) {
    console.log("Error loading edit project form", error.message)
  }
}
exports.createOpp = async (req, res, next) => {
  return res.render("app/newOpp")
}
exports.opp = async (req, res, next) => {
  const { oppId } = req.params

  try {
    const opp = await Opportunity.findById(oppId)

    return res.render("app/singleOpp", opp)
  } catch (error) {
    console.log("Error loading specific opportunity", error.message)
  }
}
exports.editOpp = async (req, res, next) => {
  const { oppId } = req.params

  try {
    const opp = await Opportunity.findById(oppId)

    return res.render("app/editOpp", opp)
  } catch (error) {
    console.log("Error loading edit opportunity form", error.message)
  }
}
exports.newCustomer = async (req, res, next) => {
  return res.render("app/newCustomer")
}
exports.customer = async (req, res, next) => {
  const { customerId } = req.params

  console.log(customerId)

  try {
    const customer = await Customer.findById(customerId)

    console.log(customer)

    return res.render("app/singleCustomer", customer)
  } catch (error) {
    console.log("Error loading customer page", error.message)
  }
  return res.render("app/singleCustomer")
}
exports.editCustomer = async (req, res, next) => {
  const { customerId } = req.params

  console.log("Id: ", customerId)

  try {
    const customer = await Customer.findById(customerId)

    console.log(customer)

    return res.render("app/editCustomer", customer)
  } catch (error) {
    console.log("Error loading edit customer form", error.message)
  }
}
exports.opportunities = async (req, res, next) => {
  try {
    let opps = await Opportunity.find({
      belongsTo: req.session.currentOrg._id,
    })

    return res.render("app/opportunities", { opps })
  } catch (error) {
    console.log("Error loading opportunities", error.message)
  }
}
exports.projects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      belongsTo: req.session.currentOrg._id,
    })

    return res.render("app/projects", { projects })
  } catch (error) {
    console.log("Error loading projects", error.message)
  }
}
exports.customers = async (req, res, next) => {
  try {
    const customers = await Customer.find({
      belongsTo: req.session.currentOrg._id,
    })

    console.log(customers)

    return res.render("app/customers", { customers })
  } catch (error) {
    console.log("Error loading customers", error.message)
  }
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
      //make current user the admin
      admin: req.session.currentUser._id,
      projects: [],
      opportunities: [],
      customers: [],
      //add user to org's users
      users: [req.session.currentUser._id],
    })

    //add new org to user's orgs
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
exports.submitEditOrg = async (req, res, next) => {
  const { name } = req.body

  try {
    const updatedOrg = await Organization.findByIdAndUpdate(
      req.session.currentOrg._id,
      { name },
      { new: true }
    )

    req.session.currentOrg = updatedOrg
    return res.redirect("/app/org")
  } catch (error) {
    console.log("Error editing org", error.message)
  }
}
exports.submitDeleteOrg = async (req, res, next) => {
  // delete all opportunities with matching belongsTo
  // delete all customers with matching belongsTo
  // delete all project with matching belongsTo
}
exports.submitCreateProject = async (req, res, next) => {
  //create new project
  const { title, customerId, startDate, goalDate, dollarValue } = req.body

  try {
    const newProject = await Project.create({
      title,
      belongsTo: req.session.currentOrg._id,
      forCustomer: customerId,
      startDate,
      goalDate,
      wasOpp: false,
      oppOpenedDate: null,
      oppCloseDate: null,
      currentStage: "New",
      dollarValue,
      posts: [],
      documents: [],
    })

    //adding project to current org
    const currentOrg = await Organization.findByIdAndUpdate(
      req.session.currentOrg,
      { $push: { projects: newProject._id } },
      { new: true }
    )

    //updating currentOrg in session
    req.session.currentOrg = currentOrg

    //redirect to app dashboard
    return res.redirect("/app/projects")
  } catch (error) {
    console.log("Error while creating project", error)
  }
}
exports.submitEditProject = async (req, res, next) => {
  const { title, dollarValue, currentStage } = req.body
  const { projectId } = req.params

  try {
    await Project.findByIdAndUpdate(projectId, {
      title,
      dollarValue,
      currentStage,
    })

    res.redirect(`/app/projects/${projectId}`)
  } catch (error) {
    console.log("Error editing project", error.message)
  }
}
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
    return res.redirect("/app/opportunities")
  } catch (error) {
    console.log("Error while creating project", error)
  }
}
exports.submitEditOpp = async (req, res, next) => {
  const { title, dollarValue, currentStage } = req.body
  const { oppId } = req.params

  try {
    await Opportunity.findByIdAndUpdate(oppId, {
      title,
      dollarValue,
      currentStage,
    })

    res.redirect(`/app/opps/${oppId}`)
  } catch (error) {
    console.log("Error editing opportunity", error.message)
  }
}
exports.submitDeleteOpp = async (req, res, next) => {}
exports.submitNewCustomer = async (req, res, next) => {
  const {
    name,
    contactFirstName,
    contactLastName,
    contactEmailAddress,
    contactPhoneNumber,
  } = req.body

  try {
    const newCustomer = await Customer.create({
      name,
      belongsTo: req.session.currentOrg._id,
      contactInfo: {
        firstName: contactFirstName,
        lastName: contactLastName,
        emailAddress: contactEmailAddress,
        phoneNumber: contactPhoneNumber,
      },
      projects: [],
      opportunities: [],
      documents: [],
    })

    console.log(newCustomer)

    const currentOrg = await Organization.findByIdAndUpdate(
      req.session.currentOrg._id,
      { $push: { customers: newCustomer._id } },
      { new: true }
    )

    req.session.currentOrg = currentOrg
    return res.redirect("/app/customers")
  } catch (error) {
    console.log("Error creating customer", error.message)
  }
}
exports.submitEditCustomer = async (req, res, next) => {
  const {
    name,
    contactFirstName,
    contactLastName,
    contactEmailAddress,
    contactPhoneNumber,
  } = req.body

  const { customerId } = req.params

  try {
    await Customer.findByIdAndUpdate(customerId, {
      name,
      contactInfo: {
        firstName: contactFirstName,
        lastName: contactLastName,
        emailAddress: contactEmailAddress,
        phoneNumber: contactPhoneNumber,
      },
    })

    res.redirect(`/app/customers/${customerId}`)
  } catch (error) {
    console.log("Error editing customer", error.message)
  }
}
exports.submitDeleteCustomer = async (req, res, next) => {}
