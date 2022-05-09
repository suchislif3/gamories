import * as api from "../api/igdb.js";

export const igdbController = {
  async get(req, res) {
    const { searchTerm } = req.query;
    try {
      const limit = 100;
      const searchQuery = `fields name, storyline;sort name;where name ~ "${searchTerm}"*;limit ${limit};`;
      const { data } = await api.searchGameByName(searchQuery);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: err.message });
    }
  },
};
