import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTemp } from '../actions/temp';

class Temp extends React.Component {
  componentDidMount() {
    this.props.getTemp();
  }

  render() {
    const { Layout, temp, getTemp } = this.props;

    return (<Layout
      temp={temp}
      getTemp={getTemp}
    />);
  }
};

Temp.propTypes = {
    getTemp: PropTypes.func.isRequired,
    temp: PropTypes.number.isRequired
};

/* 
state =
{
  "rehydrated": true,
  "status": {
    "loading": false,
    "info": null,
    "error": null,
    "success": null
  },
  "member": {
    "loading": false,
    "error": null
  },
  "recipes": {
    "loading": true,
    "error": null,
    "meals": [{
      "id": 1,
      "title": "---"
    }, {
      "id": 2,
      "title": "----- ---"
    }],
    "recipes": [{
      "placeholder": true,
      "id": 0,
      "title": "---- --- -- ------",
      "body": "---- --- -- ------ ---- --- -- ------ ---- --- -- ------ ---- --- -- ------",
      "author": "---- ------ ",
      "category": 1,
      "image": "https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5",
      "ingredients": ["---- --- -- ------", "---- ------ --- --"],
      "method": ["---- --- -- ------", "---- ------ --- --"]
    }],
    "favourites": []
  },
  "camera": {
    "autofocus": false,
    "error": null
  },
  "temp": {
    "temp": 800
  },
  "_persist": {
    "version": -1,
    "rehydrated": true
  }
}
*/
const mapStateToProps = function(state) {
  var newProps = {
    temp: state.temp.temp
  };

  return newProps;
};

const mapDispatchToProps = {
    getTemp
};

export default connect(mapStateToProps, mapDispatchToProps)(Temp);

