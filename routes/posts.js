const express = require("express");
const { models } = require("mongoose");
const Posts = require("../models/posts");

// To write http requests
const router = express.Router();

//save posts

router.post("/post/save", (req, res) => {
  //Create a new variable and sent req.body to initialize it
  let newPost = new Posts(req.body);
  // Save the object
  newPost.save((err) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    //json format
    return res.status(200).json({
      success: "Posts saved successfully",
    });
  });
});

// get posts
router.get("/posts", (req, res) => {
  Posts.find().exec((err, posts) => {
    // execute
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true, // key and value
      existingPosts: posts,
    });
  });
});

// get specific posts
router.get("/post/:id", (req, res) => {
  let postId = req.params.id; // get the id from url

  Posts.findById(postId, (err, post) => {
    if (err) {
      res, status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      post, // Get the specific post
    });
  });
});

// update posts
router.put("/post/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(
    req.params.id, // take the id of the object and update whole body
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated successfully",
      });
    }
  );
});

// delete post
router.delete("/post/delete/:id", (req, res) => {
  // end point
  Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessfull",
        err,
      });
    return res.json({
      message: "Deleted successful",
      deletedPost,
    });
  });
});

// export
module.exports = router;
