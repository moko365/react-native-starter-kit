import Store from '../store/camera';
//import { Camera } from 'expo';

export const initialState = Store;

export default function cameraReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTO_FOCUS': {
      if (action.data) {
        return {
          autofocus: true, //Camera.Constants.AutoFocus.on
        };
      }
      return initialState;
    }
    default:
      return state;
  }
}
