'use strict';

const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

module.exports = function () {
  router.get('/all', async function (req, res, next) {
    const profiles = await Profile.find();
    res.render('profile_template', {
      profile: profiles,
    });
  });
  router.get('/add', async function (req, res, next) {
    const profiles = await Profile.find();
    res.render('add_user.ejs', {
      profiles: profiles
    });
  });
  router.post('/add', async function (req, res, next) {
    const { name, description, mbti, enneagram, variant, tritype, socionics, sloan, psyche, image } = req.body;
    const user = new Profile({ name, description, mbti, enneagram, variant, tritype, socionics, sloan, psyche, image });
    await user.save();
    const profiles = await Profile.find();
    // Comment the line 26 and uncomment 27, 28, 29, 30 to see the frontend
    res.status(200).json({ profile: profiles, message: 'Profile created successfully' })
    // res.render('profile_template', {
    //   profile: profiles,
    //   message: 'Profile created successfully'
    // });
  });
  router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    const user = await Profile.findById(id);
    res.render('profile_template', {
      profile: [user],
    });
  })
  return router;
}