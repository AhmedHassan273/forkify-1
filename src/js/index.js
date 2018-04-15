import axios from 'axios';

async function getResults(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const key = '96c0f156a634b7a19acd17bd9684e913';
  //error handling
  try {
    const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes;
    console.log(recipes)
  } catch (err) {
    console.log(err);
  }

}

getResults('pizza');