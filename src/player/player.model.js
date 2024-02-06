const knex = require("../knex");

const PLAYER_TABLE = "player";

module.exports = {
    PLAYER_TABLE,

    getAll: async () => {
        return knex(PLAYER_TABLE).select();
    },

    getById: async (id) => {
        return knex(PLAYER_TABLE).where("id", id).select();
    },

    create: async (player) => {
        return knex(PLAYER_TABLE).insert(player).returning("id");
    },

    update: async (id, player) => {
        return knex(PLAYER_TABLE).where("id", id).update(player);
    },

    delete: async (id) => {
        return knex(PLAYER_TABLE).where("id", id).del();
    }
};