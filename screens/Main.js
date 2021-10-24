import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Modal, Image, Button, FlatList } from 'react-native'
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraComponent from "../components/funcComponents/CameraComponent";
import styles from '../assets/styles/styles.js';

const Main = (props) => {
    const [cameraVisible, setCameraVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [uriPhotoToDelete, setUriPhotoToDelete] = useState();
    const [images, setImages] = useState([])
    // const [previousPhoto, setPreviousPhoto] = useState('')
    let arrayToSave = []

    // const goBack = () => {
    //     props.navigation.goBack()
    // }
    const handleCameraVisibility = (param) => {
        setCameraVisible(param)
        setModalVisible(param);
    }

    console.log(props)

    useEffect(() => {
        // getData()
        // importData()
        console.log("Attualmente ho in images: ", images)
        console.log("Parametri route:", props.route.params)
        props.route.params !== undefined ? handleSaving(props.route.params.modifiedImagePath, props.route.params.photo_id) : getData()
        // clearAllData()
        // importData()
    }, [props.route.params]);

    const handleSaving = (uriPhoto, photoID) => {
        // if (uriPhoto !== previousPhoto) {
        console.log("e passato:", uriPhoto)
        let currentPhotoObject = { uri: uriPhoto, photo_id: photoID, base64: "base64DaStampare" }

        console.log("Post get data: ", currentPhotoObject)
        console.log("images: ", images)
        arrayToSave = images
        console.log("Salvataggio fase 1", arrayToSave)
        arrayToSave.push(currentPhotoObject)
        console.log("array da salvare", arrayToSave)
        setImages(arrayToSave);
        storeData("photos", arrayToSave)
        console.log("Immagini in salvataggio", images)
        // setPreviousPhoto(uriPhoto)
        // }
    }

    const storeData = async (value_key, value_data) => {
        console.log("chiave: ", value_key)
        console.log("valore: ", value_data)
        try {
            await AsyncStorage.setItem(value_key, JSON.stringify(value_data))
            console.log("immagini salvate")
        } catch (e) {
            console.log("Errore nel salvataggio nel local storage")
        }
    }

    const editPhoto = (uriPhoto, idPhoto) => {
        props.navigation.navigate('EditPhoto', {
            imgPath: uriPhoto,
            photo_id: idPhoto
        })
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('photos')
            if (value !== null) {
                console.log("lunghezza getData: ", value.length)
                console.log("value nel getData: ", value)
                setImages(JSON.parse(value));
            }
        } catch (e) {
            console.log("errore: ", e)
        }
    }

    const handleModalDeleteEvent = (uriPhoto) => {
        console.log(uriPhoto)
        setUriPhotoToDelete(uriPhoto)
        setModalDeleteVisible(!modalDeleteVisible)
    }

    const deletePhoto = (photoToDelete) => {
        let temporaryArrayPhotos = []
        temporaryArrayPhotos = images
        temporaryArrayPhotos = temporaryArrayPhotos.filter(photo => photo.uri !== photoToDelete)
        setImages(temporaryArrayPhotos)
        setModalDeleteVisible(!modalDeleteVisible)
        storeData("photos", temporaryArrayPhotos)
    }

    // PER VEDERE TUTTO QUELLO CHE HO NELL'ASYNC STORAGE
    const importData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);

            return result.map(req => req).forEach(console.log);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Spooky Photos </Text>
            <TouchableOpacity
                style={styles.genericButton}
                onPress={() => {
                    console.log(cameraVisible)
                    setModalVisible(!modalVisible);
                    setCameraVisible(!cameraVisible);
                }}
            >
                <Text style={styles.text}> 🎃 Take a scary photo 🎃</Text>
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
                    <CameraComponent
                        callbackClose={() => handleCameraVisibility(false)}
                        callbackClosedSaving={(e) => handleSaving(e)} />
                </Modal>
            }
            {
                modalDeleteVisible &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalDeleteVisible}
                    onRequestClose={() => setModalDeleteVisible(!modalDeleteVisible)}
                    // style={{flex}}
                >
                    <View
                        style={styles.modalView}
                    >
                        <Text>Do you want to delete this photo?</Text>
                        <Button title="Yes" onPress={() => deletePhoto(uriPhotoToDelete)} />
                    </View>
                </Modal>
            }
            {
                !!images &&
                <FlatList
                    data={images}
                    renderItem={({ item }) => (
                        <View
                            style={styles.gallery}>
                            <Pressable
                                onPress={() => editPhoto(item.uri, item.photo_id)}
                                onLongPress={(e) => handleModalDeleteEvent(item.uri)}
                            >
                                <Image
                                    style={styles.imageThumbnail}
                                    source={{ uri: item.uri }}
                                />
                            </Pressable>
                        </View>
                    )}
                    //Setting the number of column
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                />
            }
        </View>
    )
}
export default Main;