import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import { Camera, Permissions } from 'expo';

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  constructor(props) {
    super(props);

    this.state = {
      files: []
    }

    this.onTakePicture = this.onTakePicture.bind(this);
  }

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

  async onTakePicture() {
    if (!this.camera) {
      return console.log('no camera');
    }

    // FIXME: use Redux
    let photo = await this.camera.takePictureAsync();

    /*
    photo {
      "height": 736,
      "uri": "file:///var/mobile/Containers/Data/Application/A877E01C-FDF6-4BB2-9DCD-3BB9122C0188/Library/Caches/ExponentExperienceData/%2540jollen%252Freact-native-starter-kit/Camera/A20AC121-A8D8-4042-AB56-FC418D6A0B40.jpg",
      "width": 1080,
    }
    */

    this.state.files.push(photo.uri);
    this.setState( this.state );
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
            type={this.state.type}
            ref={ref => {this.camera = ref;}}>
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
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.onTakePicture}>
                <Icon 
                  style={{ fontSize: 24, marginBottom: 10, color: 'white' }}
                  type="FontAwesome" name="circle"
                  />
              </TouchableOpacity>               
            </View>            
          </Camera>
          <View style={styles.viewGallery}> 
            {this.state.files.map(file => (
              <Image
                style={{
                  flex: 0.1, 
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  width: 80, 
                  height: 80
                }}
                source={{ uri: file }} />
            ))}
          </View>
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

//Styles
const styles = StyleSheet.create({
  viewGallery: {
    flex: 1,
    flexDirection: 'row',   
    height: 80,
    backgroundColor:'#ffffff'
  }
})



