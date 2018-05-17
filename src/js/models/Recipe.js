import axios from "axios";
import {
  key,
  proxy
} from '../config';


export default class Recipe {
  constructor(id) {
    this._id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this._id}`);
      this._title = res.data.recipe.title;
      this._author = res.data.recipe.publisher;
      this._img = res.data.recipe.image_url;
      this._url = res.data.recipe.source_url;
      this._ingredients = res.data.recipe.ingredients;
    } catch (err) {
      console.log(err);
      alert('Something went wrong')
    }
  }

  calcTime() {
    //Assuming that we need 15 minutes per each 3 ingredients
    const numIng = this._ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this._time = periods * 15;
  }

  calcServings() {
    this._servings = 4;
  }
}