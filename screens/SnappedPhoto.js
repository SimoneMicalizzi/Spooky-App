import React from "react"
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../assets/styles/styles.js';
import { Dimensions } from 'react-native';

const SnappedPhoto = (props) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    console.log("props: ", props)

    const handleSave = (value) => {
        return props.callbackSave(value)
    }

    const handleDelete = () => {
        return props.callbackDelete()
    }

    return (
        <>
            <View>
                <Image
                    source={{ uri: props.photo }}
                    style={{ width: windowWidth, height: windowHeight }}
                />
                <View style={styles.containerButtons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleSave(props.photo)
                        }}
                    >
                        <Text style={styles.text}>Salva</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleDelete()
                        }}
                    >
                        <Text style={styles.text}>Elimina</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default SnappedPhoto;