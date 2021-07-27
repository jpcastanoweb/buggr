const inApp = (req, res, next) => {
  res.locals.inApp = true
  next()
}

const outApp = (req, res, next) => {
  res.locals.inApp = false
  next()
}

module.exports = {
  inApp,
  outApp,
}
