const express = require("express")

module.exports = function(app, prefix) {
  let router = express.Router()

  let ingress_protocol = process.env["INGRESS_PROTOCOL"]
  let ingress_domain = process.env["INGRESS_DOMAIN"]

  let session_namespace = process.env["SESSION_NAMESPACE"]

  let allowed = `${ingress_protocol}://${session_namespace}-initializr.${ingress_domain}`

  router.get("/message-receiver.js", (req, res) => {
    res.send(`
      window.addEventListener("message", function(event) {
        if (event.origin == "${allowed}") {
          if (event.data.target == "initializr:create") {
            window.eduk8s.dashboard.expose_terminal("1")
            window.eduk8s.terminals.execute_in_terminal(event.data.command, "1")
          }
        }
      })`
    )
  })

  return router
}
