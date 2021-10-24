import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Modal, Image, Button } from 'react-native'
import CameraComponent from "../assets/components/funcComponents/CameraComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/styles/styles.js';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Main = (props) => {
    const [cameraVisible, setCameraVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [images, setImages] = useState()
    const [tempImages, setTempImages] = useState([])
    let arrayToSave = []

    // const goBack = () => {
    //     props.navigation.goBack()
    // }
    const handleCameraVisibility = (param) => {
        setCameraVisible(param)
        setModalVisible(param);
    }
    
    console.log(props)

    const storeData = async (value_key, value_data) => {
        console.log("chiave: ", value_key)
        console.log("valore: ", JSON.stringify(value_data))

        try {
            await AsyncStorage.setItem(value_key, JSON.stringify(value_data))
        } catch (e) {
            console.log("Errore nel salvataggio nel local storage")
        }
    }

    useEffect(() => {
        props.route.params !== undefined ? handleSaving(props.route.params.modifiedImagePath) : null
        // if(!props.route.params.modifiedImagePath || props.route.params.modifiedImagePath!==null){
        //     handleSaving(props.route.params.modifiedImagePath)
        // }
        getData();
        // getData()
        // clearAllData()
        // importData()
    }, []);

    useEffect(() => {
        console.log(modalDeleteVisible)
    }, [modalDeleteVisible])

    const handleSaving = (e) => {
        console.log("e passato:", e)
        let currentPhotoObject = { uri: e, base64: "base64DaStampare" }

        console.log("Post get data: ", currentPhotoObject)
        console.log("tempImages: ", tempImages)
        arrayToSave = tempImages
        console.log("Salvataggio fase 1", arrayToSave)
        arrayToSave.push(currentPhotoObject)

        // arrayToSave.push(currentPhotoObject)
        console.log("array da salvare", arrayToSave)
        storeData("photos", arrayToSave)
        setTempImages(arrayToSave)
    }

    const editPhoto = (uriPhoto) => {
        //Deve fare il redirect alla pagina della modifica. Due possibili metodi:
        //Passare base64 per permettere alla libreria di aprire la foto (possibili problemi per la qualità della foto ma "easy")
        //Ricavarlo con una funzione find con una callback (più laborioso e dispendioso)
        props.navigation.navigate('EditPhoto', {
            imgPath: uriPhoto
        })
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('photos')
            if (value !== null) {
                console.log("value nel getData: ", value)
                setTempImages(JSON.parse(value));
            }
        } catch (e) {
            console.log("errore: ", e)
        }
    }

    const deletePhoto = () => {
        
    }

    // PER VEDERE TUTTO QUELLO CHE HO NELL'ASYNC STORAGE
    // const importData = async () => {
    //     try {
    //         const keys = await AsyncStorage.getAllKeys();
    //         const result = await AsyncStorage.multiGet(keys);

    //         return result.map(req => req).forEach(console.log);
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}> Spooky Photos </Text>
            <ScrollView>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log(cameraVisible)
                    setModalVisible(!modalVisible);
                    setCameraVisible(!cameraVisible);
                }}
            >
                <Text style={styles.text}> Show Camera </Text>
            </TouchableOpacity>
            {
                cameraVisible &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        setCameraVisible(!cameraVisible);
                    }}
                >
                    <CameraComponent callbackClose={() => handleCameraVisibility(false)} callbackClosedSaving={(e) => handleSaving(e)} />
                </Modal>
            }
            {
                modalDeleteVisible &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalDeleteVisible}
                    onRequestClose={() => {
                        setModalDeleteVisible(!modalDeleteVisible);
                    }}>
                    <Text>Do you want to delete this photo?</Text>
                    <Button title="Yes" onPress={() => deletePhoto()} />

                </Modal>
            }

                {
                    !!tempImages &&
                    tempImages.map((item, index) => {
                        return (
                            <Pressable
                                key={index}
                                style={{ width: 200, height: 200, flex: 1 }}

                                onPress={() => editPhoto(item.uri)}
                                onLongPress={() => setModalDeleteVisible(!modalVisible)}
                            >
                                <Image
                                    source={{ uri: item.uri }}
                                    style={{ width: 200, height: 200, flex: 1, margin: 4 }}
                                />
                            </Pressable>
                        )
                    })
                }
            </ScrollView>

        </View>
    )
}
export default Main