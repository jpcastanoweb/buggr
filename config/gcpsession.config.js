const { Firestore } = require("@google-cloud/firestore")
const session = require("express-session")
const { FirestoreStore } = require("@google-cloud/connect-firestore")

module.exports = (app) => {
  app.use(
    session({
      store: new FirestoreStore({
        dataset: new Firestore(),
        kind: "express-sessions",
      }),
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  )
}
