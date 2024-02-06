/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("player").del();
  await knex("player").insert([
    {
      id: 1,
      name: "清宮幸太郎",
      number: 21,
      high_school: "早稲田実高",
    },
    {
      id: 2,
      name: "万波中正",
      number: 66,
      high_school: "横浜高",
    },
    {
      id: 3,
      name: "野村佑希",
      number: 5,
      high_school: "花咲徳栄高",
    },
  ]);
};
