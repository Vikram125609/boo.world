'use strict';

const express = require('express');
const router = express.Router();

const profiles = [
  {
    "id": 1,
    "name": "Vikram Singh",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://avatars.githubusercontent.com/u/93823479?v=4",
  },
  {
    "id": 2,
    "name": "Giridhar Gopal",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://avatars.githubusercontent.com/u/93823479?v=4",
  },
  {
    "id": 3,
    "name": "Premanand Ji Maharaj",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://avatars.githubusercontent.com/u/93823479?v=4",
  },
  {
    "id": 4,
    "name": "Sadhvi Devavani",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://avatars.githubusercontent.com/u/93823479?v=4",
  },
];

module.exports = function () {

  router.get('/*', function(req, res, next) {
    res.render('profile_template', {
      profile: profiles,
    });
  });

  return router;
}

