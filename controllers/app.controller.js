const mongoose = require("mongoose")
const Organization = require("./../models/Organization.model")
const Project = require("./../models/Project.model")
const Opportunity = require("./../models/Opportunity.model")
const User = require("./../models/User.model")
const Customer = require("./../models/Customer.model")
const fileUploader = require("./../config/cloudinary.config")

function toDollarString(val) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  return formatter.format(val)
}

function getCustomerRevString(projects) {
  let totalRev = 0
  for (let i = 0; i < projects.length; i++) {
    totalRev += Number(projects[i].dollarValue.replace(/[^0-9.-]+/g, ""))
  }
  return toDollarString(totalRev)
}

function toDateString(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 8 ? date.getDate() + 1 : "0" + (date.getDate() + 1))
  )
}

function setTabActive(tab, res) {
  switch (tab) {
    case "opportunities":
      res.locals.opportunitiesActive = true
      res.locals.customersActive = false
      res.locals.projectsActive = false
      break
    case "customers":
      res.locals.opportunitiesActive = false
      res.locals.customersActive = true
      res.locals.projectsActive = false
      break
    case "projects":
      res.locals.opportunitiesActive = false
      res.locals.customersActive = false
      res.locals.projectsActive = true
      break
    default:
      res.locals.opportunitiesActive = false
      res.locals.customersActive = false
      res.locals.projectsActive = false
      break
  }
}

/* GET requests */
exports.myprofile = async (req, res, next) => {
  setTabActive("", res)
  return res.render("app/myprofile")
}
exports.editMyProfile = async (req, res, next) => {
  setTabActive("", res)
  return res.render("app/editMyProfile")
}
exports.createOrg = async (req, res, next) => {
  setTabActive("", res)
  return res.render("app/createOrg")
}
exports.org = async (req, res, next) => {
  setTabActive("", res)
  return res.render("app/singleOrg")
}
exports.editOrg = async (req, res, next) => {
  setTabActive("", res)
  //TODO: only if admin
  return res.render("app/editOrg")
}
exports.createProject = async (req, res, next) => {
  try {
    const customers = await Customer.find({
      belongsTo: req.session.currentOrg._id,
    })

    setTabActive("projects", res)
    return res.render("app/newProject", { customers })
  } catch (error) {
    console.log("Error loading create project form", error.message)
  }
}
exports.project = async (req, res, next) => {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId).populate("forCustomer")
    project.startDateString = toDateString(project.startDate)
    project.goalDateString = toDateString(project.goalDate)

    setTabActive("projects", res)
    return res.render("app/singleProject", project)
  } catch (error) {
    console.log("Error loading specific project", error.message)
  }
}
exports.editProject = async (req, res, next) => {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId)
    project.goalDateString = toDateString(project.goalDate)
    project.startDateString = toDateString(project.startDate)

    setTabActive("projects", res)
    return res.render("app/editProject", project)
  } catch (error) {
    console.log("Error loading edit project form", error.message)
  }
}
exports.createOpp = async (req, res, next) => {
  try {
    const customers = await Customer.find({
      belongsTo: req.session.currentOrg._id,
    })

    setTabActive("opportunities", res)
    return res.render("app/newOpp", { customers })
  } catch (error) {
    console.log("Error loading create org form", error.message)
  }
}
exports.opp = async (req, res, next) => {
  const { oppId } = req.params

  try {
    const opp = await Opportunity.findById(oppId).populate("forCustomer")
    opp.openedDateString = toDateString(opp.openedDate)
    opp.closeDateString = toDateString(opp.closeDate)

    setTabActive("opportunities", res)
    return res.render("app/singleOpp", opp)
  } catch (error) {
    console.log("Error loading specific opportunity", error.message)
  }
}
exports.editOpp = async (req, res, next) => {
  const { oppId } = req.params

  try {
    const opp = await Opportunity.findById(oppId)
    opp.openedDateString = toDateString(opp.openedDate)
    opp.closeDateString = toDateString(opp.closeDate)

    setTabActive("opportunities", res)
    return res.render("app/editOpp", opp)
  } catch (error) {
    console.log("Error loading edit opportunity form", error.message)
  }
}
exports.newCustomer = async (req, res, next) => {
  setTabActive("customers", res)
  return res.render("app/newCustomer")
}
exports.customer = async (req, res, next) => {
  const { customerId } = req.params

  console.log(customerId)

  try {
    const customer = await Customer.findById(customerId)

    //getting projects
    const projects = await Project.find({ forCustomer: customerId })
    //getting opportunities
    const opps = await Opportunity.find({ forCustomer: customerId })

    // populating dates and adding potential revenue
    let potentialNewBusiness = 0
    for (let i = 0; i < opps.length; i++) {
      // change date to readable
      opps[i].openedDateString = opps[i].openedDate.toDateString()
      opps[i].closeDateString = opps[i].closeDate.toDateString()

      // add potential New Business
      potentialNewBusiness += Number(
        opps[i].dollarValue.replace(/[^0-9.-]+/g, "")
      )
    }
    const potentialRevString = toDollarString(potentialNewBusiness)

    //populating dates and adding rev in projects
    let projectRevenue = 0
    for (let i = 0; i < projects.length; i++) {
      // change date to readable
      projects[i].startDateString = projects[i].startDate.toDateString()
      projects[i].goalDateString = projects[i].goalDate.toDateString()

      //adding project revenue
      projectRevenue += Number(
        projects[i].dollarValue.replace(/[^0-9.-]+/g, "")
      )
    }
    const projectRevString = toDollarString(projectRevenue)

    customer.dateAddedString = toDateString(customer.createdAt)

    setTabActive("customers", res)
    return res.render("app/singleCustomer", {
      customer,
      projects,
      opps,
      potentialRevString,
      projectRevString,
    })
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

    setTabActive("customers", res)
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

    let potentialRev = 0
    let numberOfOpps = opps.length

    for (let i = 0; i < opps.length; i++) {
      // get name of customer
      const customer = await Customer.findById(opps[i].forCustomer)
      opps[i].customerName = customer.name ? customer.name : ""

      // change date to readable
      opps[i].openedDateString = opps[i].openedDate.toDateString()
      opps[i].closeDateString = opps[i].closeDate.toDateString()

      // add value to total potential revenue
      potentialRev += Number(opps[i].dollarValue.replace(/[^0-9.-]+/g, ""))
    }

    potentialRev = toDollarString(potentialRev)

    setTabActive("opportunities", res)

    return res.render("app/opportunities", { opps, potentialRev, numberOfOpps })
  } catch (error) {
    console.log("Error loading opportunities", error.message)
  }
}
exports.projects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      belongsTo: req.session.currentOrg._id,
    })

    for (let i = 0; i < projects.length; i++) {
      // get name of customer
      const customer = await Customer.findById(projects[i].forCustomer)
      projects[i].customerName = customer.name

      // change date to readable
      projects[i].startDateString = projects[i].startDate.toDateString()
      projects[i].goalDateString = projects[i].goalDate.toDateString()
    }

    setTabActive("projects", res)
    return res.render("app/projects", { projects })
  } catch (error) {
    console.log("Error loading projects", error.message)
  }
}
exports.customers = async (req, res, next) => {
  try {
    const customers = await Customer.find({
      belongsTo: req.session.currentOrg._id,
    }).populate("projects")

    for (let i = 0; i < customers.length; i++) {
      customers[i].projectRevString = getCustomerRevString(
        customers[i].projects
      )
    }

    setTabActive("customers", res)
    return res.render("app/customers", { customers })
  } catch (error) {
    console.log("Error loading customers", error.message)
  }
}

/* POST requests */
exports.submitEditMyProfile = async (req, res, next) => {
  const { username, email, firstName, lastName, role } = req.body

  // const user = User.findById(req.session.currentUser._id)

  if (!username || !email || !firstName || !lastName || !role) {
    return res.render("app/editMyProfile", {
      msg: "All fields are required.",
    })
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.session.currentUser._id },
      {
        username,
        email,
        firstName,
        lastName,
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    req.session.currentUser = updatedUser
    return res.redirect("/app/myprofile")
  } catch (error) {
    res.render("app/editMyProfile", {
      msg: error.message,
    })
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

  const customerIdObj = mongoose.Types.ObjectId(customerId)

  if (!title || !customerId) {
    return res.redirect("/app/createproject")
  }

  if (dollarvalue === undefined) {
    dollarValue = 0
  } else {
    dollarValueNumber = Number(dollarValue.replace(/[^0-9.-]+/g, ""))
  }

  try {
    // create project
    const newProject = await Project.create({
      title,
      belongsTo: req.session.currentOrg._id,
      forCustomer: customerIdObj,
      startDate,
      goalDate,
      wasOpp: false,
      oppOpenedDate: null,
      oppCloseDate: null,
      currentStage: "Analysis",
      dollarValue: dollarValueString,
      posts: [],
      documents: [],
    })

    //add project to customer's projects
    await Customer.findByIdAndUpdate(customerIdObj, {
      $push: { projects: newProject._id },
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
    res.render("app/newProject", {
      msg: error.message,
    })
  }
}
exports.submitEditProject = async (req, res, next) => {
  const { title, startDate, goalDate, dollarValue, currentStage } = req.body
  const { projectId } = req.params
  const dollarValueNumber = Number(dollarValue.replace(/[^0-9.-]+/g, ""))

  try {
    await Project.findByIdAndUpdate(projectId, {
      title,
      startDate,
      goalDate,
      dollarValue: dollarValueNumber,
      currentStage,
    })

    res.redirect(`/app/projects/${projectId}`)
  } catch (error) {
    console.log("Error editing project", error.message)
  }
}
exports.submitDeleteProject = async (req, res, next) => {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId)

    // delete id from customer projects
    await Customer.findByIdAndUpdate(project.forCustomer, {
      $pull: { projects: projectId },
    })
    // delete id from org opps
    const updatedOrg = await Organization.findByIdAndUpdate(
      project.belongsTo,
      { $pull: { projects: projectId } },
      { new: true }
    )
    //update session org
    req.session.currentOrg = updatedOrg

    // delete opp
    await Project.findByIdAndDelete(projectId)

    res.redirect("/app/projects")
  } catch (error) {
    console.log("Error deleting project: ", error.message)
  }
}
exports.submitCreateOpp = async (req, res, next) => {
  //create new project
  const { title, customerId, openedDate, closeDate, dollarValue } = req.body

  const customerIdObj = mongoose.Types.ObjectId(customerId)

  if (dollarValue === undefined) {
    dollarValue = 0
  } else {
    dollarValueNumber = Number(dollarValue.replace(/[^0-9.-]+/g, ""))
  }

  try {
    //create new opp
    const newOpp = await Opportunity.create({
      title,
      belongsTo: req.session.currentOrg._id,
      forCustomer: customerIdObj,
      openedDate,
      closeDate,
      currentStage: "New",
      dollarValue: dollarValueNumber,
      posts: [],
      documents: [],
    })

    //add  opp to customer's opps
    await Customer.findByIdAndUpdate(customerIdObj, {
      $push: { opportunities: newOpp._id },
    })

    //add opp to currentOrg's opps
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
    return res.render("app/newOpp", {
      msg: error.message,
    })
  }
}
exports.submitEditOpp = async (req, res, next) => {
  const { title, openedDate, closeDate, dollarValue, currentStage } = req.body
  const { oppId } = req.params
  const dollarValueNumber = Number(dollarValue.replace(/[^0-9.-]+/g, ""))

  try {
    await Opportunity.findByIdAndUpdate(oppId, {
      title,
      openedDate,
      closeDate,
      dollarValue: dollarValueNumber,
      currentStage,
    })

    res.redirect(`/app/opps/${oppId}`)
  } catch (error) {
    console.log("Error editing opportunity", error.message)
  }
}
exports.submitDeleteOpp = async (req, res, next) => {
  const { oppId } = req.params

  try {
    const opp = await Opportunity.findById(oppId)

    // delete id from customer opps
    await Customer.findByIdAndUpdate(opp.forCustomer, {
      $pull: { opportunities: oppId },
    })
    // delete id from org opps
    const updatedOrg = await Organization.findByIdAndUpdate(
      opp.belongsTo,
      { $pull: { opportunities: oppId } },
      { new: true }
    )
    //update session org
    req.session.currentOrg = updatedOrg

    // delete opp
    await Opportunity.findByIdAndDelete(oppId)

    res.redirect("/app/opportunities")
  } catch (error) {
    console.log("Error deleting opportunity: ", error.message)
  }
}
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
exports.submitDeleteCustomer = async (req, res, next) => {
  // console.log("will delete customer")
  const { customerId } = req.params

  try {
    const customer = await Customer.findById(customerId)

    console.log(customer.projects)

    // delete all projects
    for (let i = 0; i < customer.projects.length; i++) {
      // delete from org
      await Organization.findByIdAndUpdate(customer.belongsTo, {
        $pull: { projects: customer.projects[i] },
      })
      // delete project
      await Project.findByIdAndDelete(customer.projects[i])
    }

    // delete opportunities
    for (let i = 0; i < customer.opportunities.length; i++) {
      //delete from org
      await Organization.findByIdAndUpdate(customer.belongsTo, {
        $pull: { opportunities: customer.opportunities[i] },
      })
      //delete opportunity
      await Opportunity.findByIdAndDelete(customer.opportunities[i])
    }

    // delete customer from org.customers
    await Organization.findByIdAndUpdate(customer.belongsTo, {
      $pull: { customers: customerId },
    })

    //delete customer
    await Customer.findByIdAndDelete(customerId)

    //update current org
    const updatedOrg = await Organization.findById(req.session.currentOrg._id)
    req.session.currentOrg = updatedOrg

    //redirect
    res.redirect("/app/customers")
  } catch (error) {
    console.log("Error while deleting customer: ", error.message)
  }
}

/* Convert POST */
exports.convertOppToProject = async (req, res, next) => {
  const { oppId } = req.params

  try {
    const opp = await Opportunity.findById(oppId)

    const startDate = new Date()
    const goalDate = new Date()
    const dollarValue = Number(opp.dollarValue.replace(/[^0-9.-]+/g, ""))
    // create new project
    const newProject = await Project.create({
      title: opp.title,
      belongsTo: req.session.currentOrg._id,
      forCustomer: opp.forCustomer,
      startDate,
      goalDate,
      wasOpp: true,
      oppOpenedDate: opp.openedDate,
      oppCloseDate: opp.closeDate,
      currentStage: "Analysis",
      dollarValue,
      posts: [],
      documents: [],
    })

    console.log("Created project")
    await Organization.findByIdAndUpdate(newProject.belongsTo, {
      $pull: { opportunities: opp._id },
    })

    console.log("pulled opp from org")

    await Customer.findByIdAndUpdate(newProject.forCustomer, {
      $pull: { opportunities: opp._id },
    })

    console.log("pulled opp from customer")

    // delete opp
    await Opportunity.findByIdAndDelete(oppId)

    console.log("deleted opp")

    // adding to org and customer
    await Organization.findByIdAndUpdate(newProject.belongsTo, {
      $push: { projects: newProject._id },
    })

    console.log("pushed project to org")

    await Customer.findByIdAndUpdate(newProject.forCustomer, {
      $push: { projects: newProject._id },
    })

    console.log("pushed project to customer")

    console.log("New project", newProject)
    console.log("session org", req.session.currentOrg)

    // redirect to projects
    // const updatedOrg = Organization.findById(newProject.belongsTo)
    // req.session.currentOrg = updatedOrg
    res.redirect("/app/opportunities")
  } catch (error) {
    console.log("Error converting opp to project", error.message)
  }
}

/* File Uploaders */

// Customer
exports.uploadFileCustomer = async (req, res, next) => {
  const { customerId } = req.params
  res.render("app/uploadFile", {
    customerId,
  })
}

exports.submitUploadFileCustomer = async (req, res, next) => {
  const { customerId } = req.params
  const { fileName } = req.body

  if (!fileName | !req.file) {
    return res.redirect(`/app/customers/${customerId}`)
  }

  console.log(req.file.mimetype)

  try {
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      {
        $push: {
          documents: {
            name: fileName,
            fileType: req.file.mimetype,
            docUrl: req.file.path,
          },
        },
      },
      { new: true }
    )

    console.log(customer)
    res.redirect(`/app/customers/${customerId}`)
  } catch (error) {
    console.log("Error uploading new document", error.message)
  }
}

// Project

exports.uploadFileProject = async (req, res, next) => {
  const { projectId } = req.params
  res.render("app/uploadFile", {
    projectId,
  })
}

exports.submitUploadFileProject = async (req, res, next) => {
  const { projectId } = req.params
  const { fileName } = req.body

  if (!fileName | !req.file) {
    return res.redirect(`/app/projects/${projectId}`)
  }

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: {
          documents: {
            name: fileName,
            fileType: req.file.mimetype,
            docUrl: req.file.path,
          },
        },
      },
      { new: true }
    )

    res.redirect(`/app/projects/${projectId}`)
  } catch (error) {
    console.log("Error uploading new document", error.message)
  }
}

// Project

exports.uploadFileOpp = async (req, res, next) => {
  const { oppId } = req.params
  res.render("app/uploadFile", {
    oppId,
  })
}

exports.submitUploadFileOpp = async (req, res, next) => {
  const { oppId } = req.params
  const { fileName } = req.body

  if (!fileName | !req.file) {
    return res.redirect(`/app/opps/${oppId}`)
  }

  try {
    const opp = await Opportunity.findByIdAndUpdate(
      oppId,
      {
        $push: {
          documents: {
            name: fileName,
            fileType: req.file.mimetype,
            docUrl: req.file.path,
          },
        },
      },
      { new: true }
    )

    res.redirect(`/app/opps/${oppId}`)
  } catch (error) {
    console.log("Error uploading new document", error.message)
  }
}
