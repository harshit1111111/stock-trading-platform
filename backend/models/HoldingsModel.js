

const { model } = require("mongoose");
const {HoldingsSchema}= require ("../Schema/HoldingsSchema.js");

const HoldingsModel =new model ("holding",HoldingsSchema);

module.exports={HoldingsModel};