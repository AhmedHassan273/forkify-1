import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

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
    //4 - search for recipes
    await state.search.getResults();

    //5 - render results on UI
    searchView.renderResults(state.search._result);
  }
};

//event listeners
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
