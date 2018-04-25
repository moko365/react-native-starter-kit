import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Camera, Permissions } from 'expo';

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onBarCodeRead(barcode) {
    console.log(barcode.data);
  }

  onCameraReady() {
    console.log('camera ready.')
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      console.log('CameraComponent:render')
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            onBarCodeRead={this.props.onBarCodeRead}
            autoFocus={this.props.autoFocus}
            takePictureReady={this.props.takePictureReady}
            onCameraReady={this.onCameraReady}
            style={this.props.style} 
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Icon 
                  style={{ fontSize: 24, marginBottom: 10, color: 'white' }}
                  type="FontAwesome" name="clone"
                  />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.props.getCameraParameter}>
                <Icon 
                  style={{ fontSize: 24, marginBottom: 10, color: 'white' }}
                  type="FontAwesome" name="circle-o-notch"
                  />
              </TouchableOpacity>              
            </View>
          </Camera>
        </View>
      );
    }
  }
}

CameraComponent.propTypes = {
  onBarCodeRead: PropTypes.func,
  autoFocus: PropTypes.number,
  getCameraParameter: PropTypes.func,
  takePictureReady: PropTypes.func,
  style: PropTypes.object,
}

CameraComponent.defaultProps = {
  style: { flex: 1 },
}







