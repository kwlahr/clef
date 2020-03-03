var express = require("express");

var router = express.Router();

// Import the model (user.js) to use its database functions.
var user = require("../models/user.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  user.all(function(data) {
    var hbsObject = {
      users: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/users", function(req, res) {
  user.create(["name", "age"], [req.body.name, req.body.age], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/users/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  user.update(
    {
      age: req.body.age
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Export routes for server.js to use.
module.exports = router;
