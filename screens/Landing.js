import React from 'react';
import { Component } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/styles/styles';
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ""
        }
        this.localStorageData = {
            usernameStorage: '',
            passwordStorage: ''
        }
    }

    componentDidMount() {
        this.animation.play();
        this.storeData()
        this.getData()
    }

    storeData = async () => {
        let error = ""
        try {
            await AsyncStorage.setItem('username', "simone")
            await AsyncStorage.setItem('password', "beije")
        } catch (e) {
            error = "Errore nel salvataggio nel local storage"
            this.setState({
                error: error
            })
        }
    }

    getData = async () => {
        let error = ""
        try {
            const value_username = await AsyncStorage.getItem('username')
            const value_password = await AsyncStorage.getItem('password')
            if (value_username !== null) {
                this.localStorageData.usernameStorage = value_username
                console.log("username get: ", this.localStorageData.usernameStorage)
            }
            if (value_password !== null) {
                this.localStorageData.passwordStorage = value_password
                console.log("password get: ", this.localStorageData.passwordStorage)
            }
        } catch (e) {
            error = "Errore nel get dal local storage"
            this.setState({
                error: error
            })
        }

    }

    handleLogin = () => {
        let error = ""
        if (this.state.username.length >= 4 && this.state.password.length >= 4) {
            if (this.state.username !== this.localStorageData.usernameStorage) {
                error = "🎃 Username errato 🎃"
            }
            else if (this.state.password !== this.localStorageData.passwordStorage) {
                error = "🎃 Password errata 🎃"
            } else{
                //Corretto, pusho alla pagina successiv
                this.goToMain()
            }
        }
        else if (this.state.username.length < 4) {
            error = "🎃 Username invalido 🎃"
        }
        else if (this.state.password.length < 4) {
            error = "🎃 Password invalida 🎃"
        }
        else if (this.state.username.length < 4 && this.state.password.length < 4) {
            error = "🎃 Username e password invalidi 🎃"
        }
        this.setState({
            error: error
        })
    }

    goToMain = () => {
        this.props.navigation.navigate('Main')
    };

    onChangeUsername = (e) => {
        this.setState({
            username: e
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e
        })
    }

    render() {
        return (
            <View style={styles.animationContainer}>
                <Text style={styles.title}> Spooky App </Text>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 300,
                        height: 300,
                    }}
                    source={require('../assets/images/halloween-pumpkin-black-cat.json')}
                />
                <TextInput
                    style={styles.input}
                    maxLength={25}
                    value={this.state.username}
                    onChangeText={this.onChangeUsername}
                    placeholder={"username"}
                />
                <TextInput
                    style={styles.input}
                    maxLength={25}
                    value={this.state.password}
                    onChangeText={this.onChangePassword}
                    placeholder={"password"}
                />

                <Text>{this.state.error}</Text>

                <View style={styles.buttonContainerLanding}>
                    <Button style={styles.genericButton} title="Login" onPress={this.handleLogin} color={'#FE5A0E'} />
                </View>
            </View>
        );
    }

}

export default Landing
