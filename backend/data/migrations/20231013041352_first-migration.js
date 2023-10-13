/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
  .createTable("users",table=> {
    table.increments("user_id")
    table.string("user_username").unique().notNullable();
    table.string("user_password").notNullable();
  })
  .createTable("protected",table=> {
    table.increments("protected_id")
    table.string("protected_information")
    table.integer("user_id")
    .unsigned()
    .notNullable()
    .references("user_id")
    .inTable("users")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
  .dropTableIfExists("users")
};
