import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ffffff'
    },
    title: {
        fontFamily: 'SpookyFont',
        fontSize: 60,
        color: '#FE5A0E',
        padding: 16,
    },
    gallery: {
        flex: 1,
        flexDirection: 'column',
        margin: 1
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    modalView: {
        // marginTop: 350,
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingRight: 50,
        paddingLeft: 40,
        borderColor: '#FE5A0E',
        borderRadius: 4,
    },
    genericButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FE5A0E',
    },
    buttonContainerLanding: {
        paddingTop: 20,
    },
    containerButtons: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,

    },
    buttonsEdit: {
        // flex: 1,
        // backgroundColor: 'transparent',
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: 20,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    colorButtons: {
        width: 30,
        height: 30,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        marginRight: 5,
        borderRadius: 100,
    }
})
export default styles;