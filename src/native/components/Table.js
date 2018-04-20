import React from 'react';
import { WebsocketStore, WebsocketActions } from 'react-websocket-flux';
import { 
    View, 
    Text, 
    StyleSheet, 
    RefreshControl,
    Dimensions, 
    TouchableOpacity, 
    TouchableHighlight, 
    AppRegistry } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

class Table extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.data = [];
        this.key = 0;

        this.state = {
            dataSource: [],
            refreshing: false
        };

        this.onMessage = this.onMessage.bind(this);
    }

    componentDidMount() {
        WebsocketStore.addMessageListener(this.onMessage);
    }

    componentWillUnmount() {
        WebsocketStore.removeMessageListener(this.onMessage);      
    }

    onMessage(data) {
        this.data.push(data);

        // max 10 rows
        if (this.data.length > 10) {
            this.data = this.data.slice(1);
        // initialize views
        } else {
            this.setState({dataSource: this.data});
        }
    }

    renderItem(row) {
        return (
            <View style={styles.rowFront}>
                <Text>{row.item.temperature}</Text>
            </View>            
        );
    }

    renderHiddenItem(row) {
        return (
            <View style={styles.rowBack}>
                <Text>Left</Text>
                <Text>Right</Text>
            </View>         
        );
    }

    onRefresh() {
        this.setState({
            dataSource: this.data,
            refreshing: true
        });
        this.setState({refreshing: false});
    }

    render() { 
        return (
            <View>
                <Text>Latest Data</Text>
                <SwipeListView
                    useFlatList
                    data={ this.state.dataSource }
                    renderItem={ this.renderItem }
                    renderHiddenItem={ this.renderHiddenItem }
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        )
    }
 
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backTextWhite: {
        color: '#FFF'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    }
});

export default Table;
