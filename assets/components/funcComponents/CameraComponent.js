import React, { useState, useRef } from "react";
import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import SnappedPhoto from '../../../screens/SnappedPhoto'
import * as MediaLibrary from 'expo-media-library';
import styles from '../../../assets/styles/styles.js';

const CameraComponent = (props) => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [snapped, setSnapped] = useState(false)
    const [photo, setPhoto] = useState('')
    // this.photo = []
    const handleCallbackClose = (e) => {
        return props.callbackClose(e)
    }

    const handleCallBackSaved = (e) =>{
        console.log("e cameracomponent:", e)
        return props.callbackClosedSaving(e)
    }

    let camera = useRef(null)
    //Sistemare bottone chiudi --> Funziona
    //Aggiungere funzione per scattare la foto --> Funziona
    //Mostrare a video la foto per chiedere la conferma di salvataggio --> Funziona
    //Salvare foto in galleria
    //Eliminare -> ritorna alla fotocamera
    //Mostrare a video in uno screen separato le foto scattate (local storage o galleria)
    //Implementare modifiche sulla foto
    //EXTRA: Aggiungere flash EXTRA
    //EXTRA: Aggiungere video 

    const snap = async () => {
        if (camera) {
            const options = { quality: 0.2, uri: true, base64: true };
            const { uri, base64 } = await camera.takePictureAsync(options);
            const asset = await MediaLibrary.createAssetAsync(uri); //mi serve solo l'uri

            console.log("prova base", base64)
            console.log("asset: ", asset)
            console.log("asset: ", uri)
            // localStorage.setItem 
            setPhoto(uri)
            setSnapped(true)
            // this.photo.push(tempPhoto)
        }
    };

    const handleCallbackSavePhoto = (e) => {
        console.log("sto salvando")
        handleCallBackSaved(e)
        handleCallbackClose(e)
        // setSnapped(false)
    }

    const handleCallBackDeletePhoto = () => {
        handleCallbackClose()
    }

    return (
        <>
            {
                snapped &&
                <>
                    <SnappedPhoto
                        callbackSave={(e) => handleCallbackSavePhoto(e)}
                        callbackDelete={(e) => handleCallBackDeletePhoto(e)}
                        photo={photo} />
                </>
            }
            {
                !snapped &&
                <Camera style={styles.camera} type={type} ratio='4:3' ref={ref => {
                    camera = ref;
                }}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                snap()
                            }}
                        >
                            <Text style={styles.text}>Snap</Text>
                        </TouchableOpacity>
                        <Pressable
                            style={styles.button}
                            onPress={handleCallbackClose}>
                            <AntDesign name="close" size={24} color="#ffffff" />
                        </Pressable>
                    </View>
                </Camera>
            }
        </>
    )
}


export default CameraComponent;
