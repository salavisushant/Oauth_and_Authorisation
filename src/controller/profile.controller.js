const express = require("express");

const Profile = require("../models/profile.model");

const authenticate = require("../midddlewares/authenticate");
const authorise = require("../midddlewares/authorise");

const router = express.Router();

router.post("/", 
authenticate, 
authorise(["seller","admin"]),
async (req, res) => {
  try {
    const user = req.user;
    const profile = await Profile.create({
      product: req.body.product,
      price: req.body.price,
      user: user.user._id,
    });

    return res.status(201).json({ profile });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});



router.get("/", async (req, res) => {
  const profile = await Profile.find().lean().exec();

  return res.send(profile);
});


router.patch("/:id",
authenticate, 
authorise(["seller","admin"]),
async (req, res) => {
  try {
    const user = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).send({ message: e.message, status: "Failed" });
  }
});


router.delete("/:id",
authenticate, 
authorise(["seller","admin"]),
async (req, res) => {
  try {
    const user = await Profile.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).send({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
