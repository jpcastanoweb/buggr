exports.home = (req, res, next) => {
  res.render("index")
}

exports.product = (req, res, next) => {
  res.render("home/product")
}

exports.contactus = (req, res, next) => {
  res.render("home/contactus")
}

exports.aboutus = (req, res, next) => {
  res.render("home/aboutus")
}
