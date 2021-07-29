exports.home = (req, res, next) => {
  return res.redirect("/app")
  res.render("index")
}

exports.product = (req, res, next) => {
  return res.redirect("/app")
  res.render("home/product")
}

exports.contactus = (req, res, next) => {
  return res.redirect("/app")
  res.render("home/contactus")
}

exports.aboutus = (req, res, next) => {
  return res.redirect("/app")
  res.render("home/aboutus")
}
