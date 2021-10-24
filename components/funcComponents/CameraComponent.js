import React, { useState, useRef } from "react";
import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import SnappedPhoto from '../../screens/SnappedPhoto'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../assets/styles/styles.js';

const CameraComponent = (props) => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [snapped, setSnapped] = useState(false)
    const [photo, setPhoto] = useState('')

    const handleCallbackClose = (e) => {
        return props.callbackClose(e)
    }
    const handleCallBackSaved = (e) => {
        console.log("e cameracomponent:", e)
        return props.callbackClosedSaving(e)
    }

    let camera = useRef(null)
    //EXTRA: Aggiungere flash EXTRA
    //EXTRA: Aggiungere video 

    const snap = async () => {
        if (camera) {
            const options = { quality: 0.2, uri: true, base64: true };
            const { uri, base64 } = await camera.takePictureAsync(options);
            const asset = await MediaLibrary.createAssetAsync(uri); //mi serve solo l'uri
            // console.log("prova base", base64)
            // console.log("asset: ", asset)
            // console.log("uri: ", uri)
            setPhoto(uri)
            setSnapped(true)
        }
    };

    const handleCallbackSavePhoto = (e) => {
        console.log("sto salvando")
        handleCallBackSaved(e)
        handleCallbackClose(e)
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
                            <Ionicons name="camera-reverse-outline" size={40} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                snap()
                            }}
                        >
                            <FontAwesome5 name="circle" size={35} color="#ffffff" />
                        </TouchableOpacity>
                        <Pressable
                            style={styles.button}
                            onPress={handleCallbackClose}>
                            <FontAwesome5 name="times" size={40} color="#ffffff" />
                        </Pressable>
                    </View>
                </Camera>
            }
        </>
    )
}


export default CameraComponent;
