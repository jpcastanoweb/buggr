const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login")
  }

  next()
}

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/app")
  }

  next()
}

module.exports = {
  isLoggedIn,
  isLoggedOut,
}
