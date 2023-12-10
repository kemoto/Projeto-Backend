const { Router } = require("express");
const { sequelize } = require("../database/sequelize");

const installBD = Router();

installBD.get("/", async (req, res) => {
  await sequelize.sync({force: true});
  res.status(201).json();
})

module.exports = installBD;