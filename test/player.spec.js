const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const playerModel = require("../src/player/player.model");
const PLAYER_TABLE = playerModel.PLAYER_TABLE;
const testPlayer = {
  id: 1234,
  name: "Test Player",
  number: 123,
  high_school: "Test High School",
};

describe("player", () => {
  before(async () => {
    await knex(PLAYER_TABLE)
      .insert(testPlayer)
      .returning("id")
      .then(() => {
        console.log("inserted test player");
      })
      .catch(console.error);
  });

  after(async () => {
    await knex(PLAYER_TABLE)
      .where("id", testPlayer.id)
      .returning("id")
      .del()
      .then(() => {
        console.log("removed test player");
      })
      .catch(console.error);
  });

  describe("DB setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(PLAYER_TABLE)
        .select()
        .catch(() => assert.fail("player table is not found."));
    });
  });

  describe("DB getAll", () => {
    it("should return an array of players", async () => {
      const players = await playerModel.getAll();
      expect(players).to.be.an.instanceof(Array);
    });

    it("should accept a limit argument", async () => {
      const players = await playerModel.getAll(2);
      expect(players.length).to.be.at.most(2);
    });
  });

  describe("DB getById", () => {
    describe("when player exists", () => {
      it("should get player by id", async () => {
        const player = await playerModel.getById(testPlayer.id);
        expect(player).to.exist;
        expect(player.id).to.eq(testPlayer.id);
      });
    });

    describe("when player doesn't exist", () => {
      it("should return undefined", async () => {
        const player = await playerModel.getById(45000);
        expect(player).to.be.undefined;
      });
    });
  });

  describe("DB create", () => {
    const newId = 9999;

    after(async () => {
      await knex
        .from(PLAYER_TABLE)
        .where("id", newId)
        .del()
        .catch(console.error);

      console.log("Deleted test player");
    });

    describe("with valid properties", () => {
      it("should be able to create a new player", async () => {
        const newPlayer = {
          id: newId,
          name: "New Player",
          number: 999,
          high_school: "New High School",
        };

        const id = await playerModel.create(newPlayer);
        const player = await knex(PLAYER_TABLE)
          .select()
          .where("id", id)
          .first();
        expect(player).to.exist;
        expect(player.id).to.eq(newId);
      });
    });

    // describe("with invalid parameters", () => {
    //     it("should throw an error", () => {
    //         assert.throws(() => {
    //             playerModel.create({
    //                 bad_param: "HELLO!",
    //             });
    //         }, "Invalid field: bad_param");
    //     });
    // });
  });

  describe("DB update", () => {
    describe("with valid parameters", () => {
      after(async () => {
        await knex(PLAYER_TABLE)
          .update({
            number: 321,
          })
          .where("id", testPlayer.id)
          .returning("id")
          .then(() => {
            console.log("updated test player");
          })
          .catch(console.error);
      });

      it("should return the id", async () => {
        const id = await playerModel.update(testPlayer.id, {
          number: 321,
        });
        expect(id).to.eq(testPlayer.id);
      });

      it("should update the player", async () => {
        const player = await playerModel.getById(testPlayer.id);
        expect(player.name).to.eq("Test Player");
      });
    });

    // describe("when invalid parameters", () => {
    //   it("shouldn't update the player", async () => {
    //     assert.throws(() => {
    //       playerModel.update(testPlayer.id, {
    //         favorite_food: "Pizza",
    //       });
    //     }, "Invalid field: favorite_food");
    //   });
    // });
  });

  // write a test for delete
  describe("DB delete", () => {
    it("should delete the player", async () => {
      await playerModel.delete(testPlayer.id);
      const player = await playerModel.getById(testPlayer.id);
      expect(player).to.eq(undefined);
    });
  });
});
