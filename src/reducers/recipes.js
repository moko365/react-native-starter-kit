import Store from '../store/recipes';

export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data,
      };
    }
    case 'RECIPES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'RECIPES_REPLACE': {
      let recipes = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        recipes = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: '',
          image: 'https://placeimg.com/640/480/any?' + item.id,
          author: item.user.login,
          ingredients: [],
          method: [],
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        recipes,
      };
    }
    default:
      return state;
  }
}
