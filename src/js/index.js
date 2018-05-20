import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import {
  elements,
  renderLoader,
  clearLoader
} from "./views/base";

/** Global state
 * - Search Object
 * - Current recipe Object
 * - shopping list object
 * - liked recipes
 */
const state = {};

const controlSearch = async () => {
  // 1 - get query from the view
  const query = searchView.getInput();

  if (query) {
    //2 - new search object and add to state
    state.search = new Search(query);
    //3 - prepare ui for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //4 - search for recipes
      await state.search.getResults();

      //5 - render results on UI
      clearLoader();
      searchView.renderResults(state.search._result);
    } catch (err) {
      console.log(err);
      clearLoader();
    }
  }
};

/*recipe controller*/
const controlRecipe = async () => {
  //get id from url by extracting the hash and replacing the # with nothing
  const id = window.location.hash.replace("#", "");
  if (id) {
    //  prepare ui for changes
    renderLoader(elements.recipe);
    // highlight selected search item
    if (state.search) {
      searchView.highlightSelected(id);
    }
    //  create new recipe object

    state.recipe = new Recipe(id);

    try {
      //  get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      //  calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe      
      clearLoader();

      recipeView.clearRecipe();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log(error);
    }
  }
};

//-event listeners
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchRes.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search._result, goToPage);
  }
});
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener('load', controlRecipe);

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);