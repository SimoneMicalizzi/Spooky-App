import React from "react"
import { View, TouchableOpacity, Image } from 'react-native'
import styles from '../assets/styles/styles.js';
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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
                        <MaterialIcons name="add-to-photos" size={40} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handleDelete()
                        }}
                    >
                        <FontAwesome5 name="trash" size={40} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default SnappedPhoto;