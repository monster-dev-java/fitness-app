const express = require('express');

const { register } = require("../controllers/api/v1/auth/auth.controller");
const { verifySignUp } = require('../middlewares');

const router = express.Router();

//register route
router.post("/register", register);

module.exports = router;