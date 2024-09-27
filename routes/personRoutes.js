const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const { jwtAuthMiddleware, genrateToken } = require("./../jwt");

// POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the  request body contains the person data

    // Create a new person document using the Mongoose model
    const newPerson = new Person(data);

    //save the new person to database
    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = genrateToken(payload);
    console.log("Token is ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from req body
    const { username, password } = req.body;

    // find the user by username
    const user = await Person.findOne({ username: username });

    // if user does not exist or password does not match
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // generate Token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = genrateToken(payload);

    // return token as response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// GET method to get the person(Read)

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch(err) {
    console.error(err);
    res.status(500).json({error:'Internal server error'});
  }
});
//   Query params in node js
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
});
// update
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the id from url parameter
    const updatedPersonData = req.body; //Updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run Mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the person id from the url parameter
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(400).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "person Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
