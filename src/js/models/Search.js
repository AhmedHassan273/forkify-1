import axios from "axios";

export default class Search {
  constructor(query) {
    this._query = query;
  }

  async getResults() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const key = "96c0f156a634b7a19acd17bd9684e913";
    //error handling
    try {
      const res = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${this._query}`
      );
      this._result = res.data.recipes;
    } catch (err) {
      console.log(err);
    }
  }
}
