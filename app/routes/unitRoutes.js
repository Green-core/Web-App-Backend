const express = require("express");
const router = express.Router();
const Unit = require("../models/unitModel");

/**
 * @route POST /units/save
 * @desc Save unit
 * @access Private
 */

router.post("/save", (req, res) => {
    const unit = new Unit(req.body);
    console.log(req.body);
    unit
        .save()
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            res.status(400);
            console.log(err);
        });
    res.status(200);
});

/**
 * @route   GET /units/get-all
 * @desc    Retrieve all units
 * @access  Private
 */

//this is the routing for get all units
router.get("/get-all", async (req, res) => {
    try {
        const units = await Unit.find();
        if (!units) throw Error("No users exist");
        console.log(units)
        res.json(units);
    } catch (e) {
        console.log('failed')
        res.status(400).json({ msg: e.message });


    }
});



/**
 * @route   POST /units/get-one
 * @desc    Retrieve unit
 * @access  Private
 */

router.post("/get-one", (req, res) => {
    Unit.findById(req.body.id)
        .then((doc) => {
            res.json(doc);
        })
        .catch((err) => {
            console.log(err);
        });
    res.status(200);
});

/**
  * @route GET /units/update/:id
  * @desc Update unit
  * @access Private
  */

router.put("/update/:id", (req, res) => {
    Unit.updateOne(
        {
            _id: req.params.id
        },
        req.body,
        {
            upsert: true
        }
    )
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    res.status(200);

});

module.exports = router;
