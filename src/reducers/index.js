import status from './status';
import member from './member';
import recipes from './recipes';
import camera from './camera';
import temp from './temp';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  member,
  recipes,
  camera,
  temp,
};
