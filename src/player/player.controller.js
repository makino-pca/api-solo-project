const playerModel = require("./player.model");

module.exports = {
  async getAll(req, res) {
    const players = await playerModel.getAll();
    res.json(players);
  },

  async getById(req, res) {
    const id = parseInt(req.params.id);
    const player = await playerModel.getById(id);
    res.json(player);
  },

  async create(req, res) {
    const player = req.body;
    const id = await playerModel.create(player);
    res.json({ id });
  },

  async update(req, res) {
    const id = parseInt(req.params.id);
    const player = req.body;
    await playerModel.update(id, player);
    res.json({ id });
  },

  async delete(req, res) {
    const id = parseInt(req.params.id);
    await playerModel.delete(id);
    res.json({ id });
  },
};
