const User = require("./../models/User.model")
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

// exports.signup = async (req, res, next) => {
//   res.render("auth/signup")
// }
exports.submitSignup = async (req, res, next) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    role,
  } = req.body
  console.log(
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    role
  )

  // Checking all fields were filled
  if (
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !firstName ||
    !lastName
  ) {
    return res.status(500).render("auth/signup", {
      msg: "Please fill all mandatory fields",
    })
  }

  //Checking passwords match
  if (password !== confirmPassword) {
    return res.status(500).render("auth/signup", {
      msg: "Passwords don't match. Please try again.",
    })
  }

  //Checking password is strong
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
  if (!regex.test(password)) {
    return res.status(500).render("auth/signup", {
      msg: "Password needs to have at least 8 characters and must contain at least one number, one lowercase and one uppercase letter.",
    })
  }

  //Checking if username is only alphanumeric
  regex = /^[a-zA-Z0-9]+$/
  if (!regex.test(username)) {
    return res.status(500).render("auth/signup", {
      msg: "Username should contain only alphanumeric characters.",
    })
  }

  //Checking if email is valid
  regex = /^\S+@\S+\.\S+$/
  if (!regex.test(email)) {
    return res.status(500).render("auth/signup", {
      msg: "Please use a valid email address.",
    })
  }

  const userData = {
    username,
    email,
    firstName,
    lastName,
    role: role || "",
    organizations: [],
  }

  try {
    // hash password before signing up
    const salt = await bcryptjs.genSalt(10)
    const passwordHash = await bcryptjs.hashSync(password, salt)

    //saving passwordHash to the user data
    userData.passwordHash = passwordHash

    //creating new User
    const newUser = await User.create(userData)

    //saving user as current user in session
    req.session.currentUser = newUser

    //redirecting to hompage
    res.redirect("/")
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { msg: error.message })
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {
        msg: "Email or username are already in use. ",
      })
    } else {
      next(error)
    }
  }
}

exports.login = async (req, res, next) => {
  res.render("auth/login")
}
exports.submitLogin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.render("auth/login", {
      msg: "Please insert the email associated with your account and password",
    })
  }

  try {
    //looking for emain in database
    const user = await User.findOne({ email })

    //if user doesn't exist (email wasn't found), refresh page
    if (!user) {
      return res.render("auth/login", {
        msg: "Wrong email and/or password. Please try again",
      })
    }

    //make sure password matches user's
    const authVerified = bcryptjs.compareSync(password, user.passwordHash)

    //if password doesn't match
    if (!authVerified) {
      return res.render("auth/login", {
        msg: "Wrong email and/or password. Please try again",
      })
    }

    //start session and redirect to homepage
    console.log("Logged in as:", user)
    req.session.currentUser = user
    return res.redirect("/app/dashboard")
  } catch (error) {
    console.log("Error logging in", error)
  }
}

exports.logout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err)
    res.redirect("/")
  })
}
