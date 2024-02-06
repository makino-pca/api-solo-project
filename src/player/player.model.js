const knex = require("../knex");

const PLAYER_TABLE = "player";

module.exports = {
  PLAYER_TABLE,

  getAll: async (limit = 100) => {
    return knex(PLAYER_TABLE).select().limit(limit);
  },

  getById: async (id) => {
    return await knex(PLAYER_TABLE).where("id", id).select().first();
  },

  create: async (player) => {
    return knex(PLAYER_TABLE)
      .insert(player)
      .returning("id")
      .then((result) => result[0].id);
  },

  update: async (id, player) => {
    return knex(PLAYER_TABLE)
      .where({ id: id })
      .update(player, ["id"])
      .then((result) => result[0].id);
  },

  delete: async (id) => {
    return knex(PLAYER_TABLE).where("id", id).del();
  },
};
