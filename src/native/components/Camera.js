import React from 'react';
import PropTypes from 'prop-types';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Linking,
  Dimensions
} from 'react-native';
import { Icon } from 'native-base';
import { Camera, BarCodeScanner, Permissions } from 'expo';

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      barCodeScanner: false
    }

    this.onTakePicture = this.onTakePicture.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _handleBarCodeRead(barCode) {
    console.log(barCode.data);
    Linking.openURL(barCode.data);
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
    const { hasCameraPermission, barCodeScanner } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (barCodeScanner === true) {
      
      const { height, width } = Dimensions.get('window');
      const maskRowHeight = Math.round((height - 300) / 20);
      const maskColWidth = (width - 300) / 2;

      return (
          <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            > 
            <View style={styles.maskOutter}>
              <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
              <View style={[{ flex: 30 }, styles.maskCenter]}>
                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                <View style={styles.maskInner} />
                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              </View>
              <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
            </View>
          </BarCodeScanner>    
      );
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
                onPress={() => { this.setState({barCodeScanner: true}); }}>
                <Icon 
                  style={{ fontSize: 24, marginBottom: 10, color: 'white' }}
                  type="FontAwesome" name="circle-o"
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
            <ScrollView>
            {this.state.files.map((file, index) => (
              <Image
                key={index}
                style={{
                  flex: 1, 
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  width: 380, 
                  height: 180
                }}
                source={{ uri: file }} />
            ))}
            </ScrollView>
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
  },
 
  /*
   * Scanner frame
   */
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },  
})



