import React from "react";
import { View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native'
import * as FileSystem from 'expo-file-system';
import SignatureScreen from "react-native-signature-canvas";
import { FontAwesome5 } from '@expo/vector-icons';
import styles from "../assets/styles/styles";

class EditPhoto extends React.Component {
    constructor(props) {
        super(props);
        console.log("path immagine: ", props.route.params)
        console.log("path immagine: ", props.route.params.imgPath)
        console.log("id immagine: ", props.route.params.photo_id)

        this.imgWidth = Dimensions.get('window').width;
        this.imgHeight = Dimensions.get('window').height;
        this.style = `.m-signature-pad {box-shadow: none; border: none; } 
                .m-signature-pad--body {border: none;}
                .m-signature-pad--footer {display: none; margin: 0px;}
                body,html {
                width: ${this.imgWidth}px; height: ${this.imgHeight-100}px;}`;
        this.ref = React.createRef();
        this.state = {
            base64Photo: '',
            colorPen: 'red',
            photo_id: this.props.route.params.photo_id ? this.props.route.params.photo_id : 0
        }
        console.log("id immagine stato: ", this.state.photo_id)

        this.colorArray = ['red', 'white', 'black', 'blue', 'green', 'yellow']
    }

    componentDidMount() {
        this.convertToBase64(this.props.route.params.imgPath)
    }

    convertToBase64 = async (path) => {
        let value = await FileSystem.readAsStringAsync(path, { encoding: 'base64' });
        // console.log("value: ", value)
        this.setState({
            base64Photo: value
        })
    }

    handleButtonColorClick = (color) => () => {
        this.ref.current.changePenColor(color)
    }

    // handleButtonSizeClick = (color) => () => {
    //     this.ref.current.changePenSize(color)
    // }

    handleUndoButton = () => {
        this.ref.current.undo();
    };

    handleRedoButton = () => {
        this.ref.current.redo();
    };

    handleSaveButton = () => {
        this.ref.current.readSignature()
    };

    increasePhotoId = () => {
        console.log("sto salvando l'id")
        this.setState({
            photo_id: this.state.photo_id+1
        })
    }

    handleOK = (signature) => {
        console.log("=======STO AUMENTANDO L'ID IMMAGINE=======", this.state.photo_id)
        this.increasePhotoId()
        console.log("=======HO AUMENTATO L'ID IMMAGINE=======", this.state.photo_id)
        const path = this.props.route.params.imgPath + `sign${this.state.photo_id}.png`;
        // const path = this.props.route.params.imgPath + `sign${this.state.photo_id}.png`;
        FileSystem.writeAsStringAsync(
            path,
            signature.replace("data:image/png;base64,", ""),
            { encoding: FileSystem.EncodingType.Base64 }
        )
            .then(() => FileSystem.getInfoAsync(path))
            .then(console.log("path prima di inviare: ", path))
            .then(this.goBackToGallery(path, this.state.photo_id))
            .catch(console.error);
    };

    goBackToGallery = (uriPhoto, photo_id) => {
        console.log("Foto modificata che sto passando: ", uriPhoto)
        this.props.navigation.navigate('Main', {
            modifiedImagePath: uriPhoto,
            photo_id: photo_id
        })
    }

    render() {
        return (
            <View style={{ width: this.imgWidth, height: this.imgHeight }}>
                <SignatureScreen
                    ref={this.ref}
                    onOK={this.handleOK}
                    dataURL={"data:image/png;base64," + this.state.base64Photo}
                    overlayWidth={this.imgWidth}
                    overlayHeight={this.imgHeight}
                    webStyle={this.style}
                    penColor={this.state.colorPen}
                    clearText="Clear"
                />
                <View style={{
                    flex: 0.2,
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'center'
                }}>
                    {
                        this.colorArray.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={this.handleButtonColorClick(item)}
                                    key={index}
                                    value={item}

                                    style={[styles.colorButtons, {
                                        backgroundColor: item
                                    }]}>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity style={styles.buttonsEdit} onPress={this.handleUndoButton} ><FontAwesome5 name="undo" size={24} color="black" /></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonsEdit} onPress={this.handleRedoButton} ><FontAwesome5 name="redo" size={24} color="black" /></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonsEdit} onPress={this.handleSaveButton} ><FontAwesome5 name="save" size={24} color="black" /></TouchableOpacity>

                </View>

            </View>
        );
    }
};

export default EditPhoto;