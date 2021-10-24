import React from "react";
import { View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native'

import SignatureScreen from "react-native-signature-canvas";

import * as FileSystem from 'expo-file-system';

import styles from "../assets/styles/styles";

class EditPhoto extends React.Component {
    constructor(props) {
        super(props);
        console.log("path immagine: ", props.route.params.imgPath)

        this.imgWidth = Dimensions.get('window').width;
        this.imgHeight = Dimensions.get('window').height;
        this.style = `.m-signature-pad {box-shadow: none; border: none; } 
                .m-signature-pad--body {border: none;}
                .m-signature-pad--footer {display: none; margin: 0px;}
                body,html {
                width: ${this.imgWidth}px; height: ${this.imgHeight}px;}`;
        this.ref = React.createRef();
        this.state = {
            base64Photo: '',
            colorPen: 'red'
        }
        this.colorArray = ['red', 'white', 'black', 'blue', 'green', 'yellow']
    }


    componentDidMount() {
        this.convertToBase64(this.props.route.params.imgPath)
    }

    convertToBase64 = async (path) => {
        let value = await FileSystem.readAsStringAsync(path, { encoding: 'base64' });
        console.log("value: ", value)
        this.setState({
            base64Photo: value
        })
    }

    handleButtonColorClick = (color) => () => {
        this.ref.current.changePenColor(color)
    }

    handleButtonSizeClick = (color) => () => {
        this.ref.current.changePenSize(color)
    }

    handleUndoButton = () => {
        this.ref.current.undo();
    };

    handleRedoButton = () => {
        this.ref.current.redo();
    };

    handleSaveButton = () => {
        this.ref.current.readSignature()
    };

    handleOK = (signature) => {
        const path = FileSystem.cacheDirectory + "sign.png";
        FileSystem.writeAsStringAsync(
            path,
            signature.replace("data:image/png;base64,", ""),
            { encoding: FileSystem.EncodingType.Base64 }
        )
            .then(() => FileSystem.getInfoAsync(path))
            .then(console.log("path prima di inviare: ", path))
            .then(this.goBackToGallery(path))
            .catch(console.error);
    };

    goBackToGallery = (uriPhoto) => {
        console.log("Foto modificata che sto passando: ", uriPhoto)
        this.props.navigation.navigate('Main', {
            modifiedImagePath: uriPhoto
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
                //onOK={handleOK}
                />
                <ScrollView>

                    {
                        this.colorArray.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={this.handleButtonColorClick(item)}
                                    key={index}
                                    value={item}

                                    style={{
                                        width: 30,
                                        height: 30,
                                        // flex: 1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                        padding: 10,
                                        borderRadius: 100,
                                        backgroundColor: item
                                    }}>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.handleUndoButton} ><Text>Undo</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.handleRedoButton} ><Text>Redo</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSaveButton} ><Text>Save</Text></TouchableOpacity>

                </ScrollView>

            </View>
        );
    }
};

export default EditPhoto;