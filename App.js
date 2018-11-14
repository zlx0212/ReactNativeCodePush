/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal} from 'react-native';
import EditModal from './EditModal';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Hello code push!!
                </Text>
                <Text style={styles.instructions}>
                    🌹祝你的人生灿烂如花🌹
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>

                <Modal
                    transparent={true}
                    visible={true}
                    onRequestClose={() => {
                    }}
                >
                    <EditModal type={2} title="整单备注" textRemark={'我就是测试啊'} next={()=>{console.log('---->>>confirm action')}} closeAction={()=>{console.log('---->>>>colseAction')}}></EditModal>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
