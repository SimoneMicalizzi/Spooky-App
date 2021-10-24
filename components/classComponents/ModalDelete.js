import React from "react";
import { Text, Modal, Button } from 'react-native';

class ModalDelete extends React.Component {
    constructor(props) {
        super(props);

    }

    handleDelete = (photoToDelete) => {
        return this.props.callbackDelete(photoToDelete)
    }

    handleCloseModalDelete = (modalDeleteVisible) => {
        return this.props.callbackCloseModal(modalDeleteVisible)
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalDeleteVisible}
                onRequestClose={this.handleCloseModalDelete(!this.props.modalDeleteVisible)}
            >
                {/* onRequestClose={() => {
                    setModalDeleteVisible(!modalDeleteVisible);
                    
                }} */}
                <Text>Do you want to delete this photo?</Text>
                <Button title="Yes" onPress={this.handleDelete(this.props.uriPhotoToDelete)} />
            </Modal>
        )
    }
}

export default ModalDelete;