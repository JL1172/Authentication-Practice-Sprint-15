const db = require('../../data/db-config');

module.exports = {
    add,
}

async function add(newUser) {
    const [result] = await db("users").insert(newUser);
    return await db("users").where({user_id : result}).first();
}