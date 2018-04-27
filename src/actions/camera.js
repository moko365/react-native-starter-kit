export function takePictureReady() {
  console.log('in takePictureReady: auto focus started');	
  return dispatch => new Promise((resolve, reject) => {
	return resolve(dispatch({
        type: 'AUTO_FOCUSED',
        data: response.data,
      }));
  });
}

export function getCameraParameter() {
  console.log('in getCameraParameter: start auto focus');
  return dispatch => new Promise((resolve, reject) => {
    return resolve(dispatch({
        type: 'AUTO_FOCUS',
    }));
  });
}