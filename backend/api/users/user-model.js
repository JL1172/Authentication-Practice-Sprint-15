const db = require('../../data/db-config');

module.exports = {
    add,
    access,
    findByUsername
}

async function add(newUser) {
    const [result] = await db("users").insert(newUser);
    return await db("users").where({user_id : result}).first();
}

async function access(id) {
    const result = await db("protected").where({user_id : id}).first();
    return result;
}

async function findByUsername(username) {
    const isUnique = await db("users").where({user_username : username}).first();
    if (!isUnique) {
        return undefined;
    } else {
        return isUnique;
    }
}