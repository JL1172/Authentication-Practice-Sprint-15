const knex = require("knex");

const configs = require("../knexfile");

const env = "development";

module.exports = knex(configs[env]);