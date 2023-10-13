/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('protected').truncate()
  await knex('protected').insert([
    { protected_information: 'hello world',user_id : 1},
  ]);
};
