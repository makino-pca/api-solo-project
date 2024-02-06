/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("player", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("number").notNullable();
    table.string("high_school");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("player");
};
