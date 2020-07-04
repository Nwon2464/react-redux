const express = require("express");

const postEntry = require("../models/postEntry");

const router = express.Router();

// /posts
router.get("/", async (req, res) => {
  try {
    const entries = await postEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

// /posts/add
router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const newPostEntry = new postEntry(req.body);
    const createdEntries = await newPostEntry.save();
    res.json(createdEntries);
  } catch (error) {
    console.log("this is from router post /add");
    if (error.name === "ValidationError") {
      res.status(422);
    }
    console.log(error.name);
  }
});

// /posts/:id
router.get("/:id", async (req, res) => {
  try {
    const getPostEntry = await postEntry.findById(req.params.id);
    res.json(getPostEntry);
  } catch (error) {
    console.log(req.params);
    console.log("this is from router get / : id");
    next(error);
  }
});

// /posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletePostEntry = await postEntry.findByIdAndDelete(req.params.id);
    res.json(deletePostEntry);
  } catch (error) {
    console.log("this is from router delete / : id");
    next(error);
  }
});

// /posts/update/:id
router.post("/update/:id", async (req, res) => {
  try {
    await postEntry.findById(req.params.id).then((user) => {
      user.title = req.body.title;
      user.body = req.body.body;
      user.summary = req.body.summary;
      user.created_at = Date.parse(req.body.created_at);
      user.save().then(res.send("Post has been updated!"));
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
