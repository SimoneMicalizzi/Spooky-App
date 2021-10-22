import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'SpookyFont',
        fontSize: 60,
        color: '#FE5A0E'
    },
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingRight: 50,
        paddingLeft: 40,
        borderColor: '#FE5A0E'
    },
    genericButton: {
        paddingLeft: 20,
        paddingRight: 50
    },
    buttonContainerLanding: {
        paddingTop: 20,
    },
    containerButtons: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        width: 100
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
        zIndex: 222
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    // roundButton1: {
    //     width: 100,
    //     height: 100,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 10,
    //     borderRadius: 100,
    // },
})
export default styles;