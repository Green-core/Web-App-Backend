const express = require("express")
const router = express.Router()
const Chat = require("../models/chatModel")
const User = require("../models/userModel")
const Units = require("../models/unitModel")
const { ObjectId } = require('mongodb');


/**
 * @route   GET /dashboard/get-total-users
 * @desc    Retrieve total active user count
 * @access  Private
 */

router.get("/get-total-users", async (req, res) => {
  try {
    const users = await User.find({deleted:{$ne: true} }).count()
    if (!users) throw Error("No users exist")
    res.json({result:users, status: 200});
  } catch (e) {
    res.status(400).json({ msg: e.message, status: 400 })
  }
});


/**
 * @route   GET /dashboard/get-total-units
 * @desc    Retrieve total units count
 * @access  Private
 */

router.get("/get-total-units", async (req, res) => {
    try {
      const units = await Units.find().count()
      if (!units) throw Error("No units exist")
      res.json({result:units, status: 200});
    } catch (e) {
      res.status(400).json({ msg: e.message, status: 400 })
    }
  });


/**
 * @route   GET /dashboard/get-total-vulnerable-units
 * @desc    Retrieve total vulnerable units count
 * @access  Private
 */

router.get("/get-total-vulnerable-units", async (req, res) => {
    try {
      const units = await Units.find({vulnerable:{$eq: true} }).count()
      if (!units) throw Error("No vulnerable units exist")
      res.json({result:units, status: 200});
    } catch (e) {
      res.status(400).json({ msg: e.message, status: 400 })
    }
  });


/**
 * @route   GET /chats/get-total-unread-chats
 * @desc    Retrieve unread chats count
 * @access  Private
 */

router.get("/get-total-unread-chats", async (req, res) => {
  try {
    const chats = await Chat.find({ $and:[{newFromUser: true}, {deleted:{$ne: true} }]}).count();
    if (!chats) throw Error("No unread chats exist")
    res.json({result:chats, status: 200})
  } catch (e) {
    res.status(400).json({ msg: e.message, status: 400 })
  }
});


module.exports = router