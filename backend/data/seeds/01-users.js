/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
    {user_username: "jacob", user_password: '$2a$16$3O1lrA0WsS8O//LiehlKZu29dMrlRlyyxjrk0/EGhN/r37nWttuLG'},
  ]);
};
