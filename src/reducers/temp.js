export const initialState = {
  temp: -100
};

export default function tempReducer(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case 'MESSAGE_TEMP': {
      console.log('action.data =', action.data);

      var newState = {
        ...state,
        temp: action.data
      };

      return newState;
    }

    default:
      return state;
  }
}
