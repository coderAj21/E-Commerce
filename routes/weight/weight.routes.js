const express = require("express");
const { createWeightInDatabase, getAllWeight } = require("../../controller/weightController");
const weightRouter = express.Router();

weightRouter.route("").post(createWeightInDatabase).get(getAllWeight);

module.exports = weightRouter;
