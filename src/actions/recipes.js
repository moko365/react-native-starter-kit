import { Firebase, FirebaseRef } from '../lib/firebase';
import axios from 'axios'; // Version can be specified in package.json

/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on('value', (snapshot) => {
    const favs = snapshot.val() || [];
    console.log(favs);
    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}

/**
  * Get Meals
  */
export function getMeals() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('meals').once('value')
    .then((snapshot) => {
      const meals = snapshot.val() || {};

      return resolve(dispatch({
        type: 'MEALS_REPLACE',
        data: meals,
      }));
    }).catch(reject)).catch(e => console.log(e));
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}

/**
  * Get Recipes
  */
export function _getRecipes() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('recipes')
    .on('value', (snapshot) => {
      //const recipes = snapshot.val() || {};

      let recipes = [{
          id: 0,
          title: 'abc',
          body: '',
          category: '',
          image: 'https://placeimg.com/640/480/any',
          author: 'jollen',
          ingredients: '',
          method: '',
        }];

      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: recipes,
      }));
    })).catch(e => console.log(e));
}

export function getRecipes() {
  const api = 'https://api.github.com/repos/jollen/blog/issues?access_token=<YOUR-TOKEN>';

  return dispatch => new Promise(resolve => {
    axios.get(api).then(response => {
      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: response.data,
      }));
    });
  }).catch(e => console.log(e));

}











