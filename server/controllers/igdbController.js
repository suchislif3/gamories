import * as api from "../api/igdb.js";

export const igdbController = {
  async get(req, res) {
    const { searchTerm, page } = req.query;
    try {
      const limit = 50;
      const offset = (page - 1) * limit;
      const searchQuery = `fields name;sort name;where name ~ "${searchTerm}"*;limit ${limit};offset ${offset};`;
      const { data } = await api.searchGameByName(searchQuery);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: err.message });
    }
  },
};
