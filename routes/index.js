'use strict';

const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

module.exports = function () {
  router.get('/', async function (req, res, next) {
    const profiles = await Profile.find();
    res.render('index', {
      profile: profiles,
    });
  });
  return router;
}