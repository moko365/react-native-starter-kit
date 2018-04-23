import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';
import { AppLoading } from 'expo';

const { persistor, store } = configureStore();

/*
export default function App() {
	return <Root store={store} persistor={persistor} />;
}*/

export default class App extends React.Component {
	constructor(props, context) {
	    super(props, context);

		this.state = {
			isReady: false,
		};    
	}

	preloading() {

	}

	render() {
		if (!this.state.isReady) {
			return (
		        <AppLoading
		          startAsync={this.preloading}
		          onFinish={() => this.setState({ isReady: true })}
		        />		
			);
		} else {
			return <Root store={store} persistor={persistor} />;
		}
	}
}
