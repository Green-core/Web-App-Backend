const express = require("express");
const router = express.Router();
const Plant = require("../models/plantTips.model.js");

/**
 * @route   GET /plants/get
 * @desc    Retrieve all plant types
 * @access  Private
 */

router.get("/get", (req, res) => {
  Plant.find()
    .then((plants) => {
      if (!plants) {
        res.status(400).send({ err: "Cannot retreive plants details" });
      }
      // console.log(plants)
      res.status(200).json(plants);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

/**
 * @route   GET /plants/get/:id
 * @desc    Retrieve individual  plant details
 * @access  Private
 */

router.get("/get/:id", (req, res) => {
  Plant.findById(req.params.id) // plant type id
    .then((plant) => {
      if (!plant) {
        res.status(400).send({ err: "Cannot retreive plant details" });
      }
      // console.log(plant);
      res.status(200).send(plant);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

/**
 * @route   GET /plants/add
 * @desc    Add new plant type
 * @access  Private
 */

router.post("/add", (req, res) => {
  const plantName = req.body.plantName;
  console.log(plantName);
  Plant.findOne({ type: plantName })
    .then((plant) => {
      console.log(plant);
      if (plant) {
        console.log("Plant name already exists");
        return res.status(403).json({ err: "Plant name already exists" });
      } else if (!plantName) {
        return res.status(404).json({ err: "Plant name is empty" });
      } else {
        //  console.log(plant);
        const newPlant = new Plant({
          type: plantName,
        });
        newPlant.save().then((data) => {
          console.log(data);
          return res.status(200).json(data);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json(err);
    });
});

/**
 * @route   POST /plants/addTips/:id
 * @desc    Add new plant tip
 * @access  Private
 */

router.post("/addTips/:id", (req, res) => {
  const tip = { title: req.body.title, body: req.body.body };
  Plant.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { tips: tip },
    },
    { new: true } // return updated document
  )
    .then((plant) => {
      if (!plant) {
        res.status(400).send({ err: "Cannot add new plant tip" });
      }
      //  console.log(plant);
      res.status(200).send(plant);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

/**
 * @route   POST /plants/updateTips/:id
 * @desc    update plant tip
 * @access  Private
 */
router.post("/updateTips/:id", (req, res) => {
  Plant.findOneAndUpdate(
    { _id: req.body.plantId, "tips._id": req.params.id },
    {
      $set: {
        tips: [
          {
            title: req.body.title,
            body: req.body.body,
          },
        ],
      },
    },
    { new: true } // return updated document
  )
    .then((plant) => {
      if (!plant) {
        res.status(400).send({ err: "Cannot update plant tip" });
      }
      // console.log(plant);
      res.status(200).send(plant);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = router;
