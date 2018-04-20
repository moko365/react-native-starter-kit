import React from 'react';
import { Container, Content, Text, H1, H2, H3, Button } from 'native-base';
import Spacer from './Spacer';
import { LineChart, Grid } from 'react-native-svg-charts'
import { WebsocketStore, WebsocketActions } from 'react-websocket-flux';

class About extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
          data: []
        }

        this.onMessage = this.onMessage.bind(this);
        WebsocketActions.connect('ws://wot.city/object/testman/viewer');
    }

    componentDidMount() {
        WebsocketStore.addMessageListener(this.onMessage);
    }

    componentWillUnmount() {
        WebsocketStore.removeMessageListener(this.onMessage);      
    }

    onMessage(data) {
        this.state.data.push(data.temperature);
        this.setState( this.state.data );
    }

    render() { 
        return (
            <LineChart
                style={{ height: 300 }}
                data={ this.state.data }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 100, bottom: 0 }}
            >
                <Grid/>
            </LineChart>
        )
    }
 
}

export default About;
