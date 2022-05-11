import * as igdbApi from "../api/igdb.js";

export const gamesController = {
  async get(req, res) {
    const { searchTerm } = req.query;
    try {
      const limit = 100;
      const searchQuery = `fields name, storyline;sort name;where name ~ "${searchTerm}"*;limit ${limit};`;
      const { data } = await igdbApi.searchGameByName(searchQuery);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: err.message });
    }
  },
};
