/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('protected').truncate()
  await knex('protected').insert([
    { protected_information: 'bank account for 123123123', user_id : 1},
  ]);
};
