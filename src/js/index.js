import Search from "./models/Search";

/** Global state
 * - Search Object
 * - Current recipe Object
 * - shopping list object
 * - liked recipes
 */
const state = {};

const controlSearch = async () => {
  // 1 - get query from the view
  const query = "pizza"; //todo

  if (query) {
    //2 - new search object and add to state
    state.search = new Search(query);
    //3 - prepare ui for results

    //4 - search for recipes
    await state.search.getResults();

    //5 - render results on UI
    console.log(state.search._result);
  }
};

//event listeners
document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
