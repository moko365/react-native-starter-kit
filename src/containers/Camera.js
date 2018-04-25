import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Camera } from 'expo';

import { takePictureReady, getCameraParameter } from '../actions/camera';

class CameraContainer extends Component {

  componentDidMount() => this.props.getCameraParameter();
  
  render = () => {
    const { Layout, autofocus } = this.props;

    return <Layout 
              autoFocus={autofocus} />;
  }
}

const mapStateToProps = state => ({
  autofocus: state.autofocus ,
});

const mapDispatchToProps = {
  getCameraParameter,
  takePictureReady,
};

export default connect(mapStateToProps)(CameraContainer);
