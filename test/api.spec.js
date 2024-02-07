const { setupExpressServer } = require("../src/server");
// We know about chai...
const chai = require("chai");
// ...with chai-http we can add matchers for making http requests!
const chaiHttp = require("chai-http");
// ... we need to tell chai to use chaiHttp though. It is a middleware
chai.use(chaiHttp);
// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should();

// Another reason we separated creating our server from starting it
const app = setupExpressServer();

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

describe("The express server", () => {
    let request;
    beforeEach(() => {
        request = chai.request(app);
    });

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

    describe("GET /players - returning players", () => {
        it("should return the players", async () => {
            const res = await request.get("/players");
            res.body.should.be.an("array");
            res.body[0].should.have.property("number");
        });
    });

    describe("GET /players/:id - returning a player", () => {
        it("should return a player", async () => {
            const res = await request.get("/players/1234");
            res.body.should.be.an("object");
            res.body["number"].should.equal(123);
        });
    });

    describe("POST /players - creating a player", () => {
        let newId;
        it("should create a player", async () => {
            const res = await request.post("/players").send({
                name: "New Player",
                number: 456,
                high_school: "New High School",
            });

            newId = JSON.parse(res.body.id);

            res.body.should.be.an("object");
            res.body.should.have.property("id");
        });

        after(async () => {
            await knex
                .from(PLAYER_TABLE)
                .where("id", newId)
                .del()
                .catch(console.error);

            console.log("Deleted test player");
        });
    });

    describe("PUT /players/:id - updating a player", () => {
        it("should update a player", async () => {
            const res = await request.put("/players/1234").send({
                name: "Updated Player",
                number: 789,
                high_school: "Updated High School",
            });
            res.body.should.be.an("object");
            res.body.should.have.property("id");
            res.should.have.status(200);
        });
    });

    describe("DELETE /players/:id - deleting a player", () => {
        it("should delete a player", async () => {
            const res = await request.delete("/players/1234");
            res.body.should.be.an("object");
            res.body.should.have.property("id");
            res.should.have.status(200);
        });
    });
});
