import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';

import EntryApp from './EntryApp';

// import * as Localization from 'expo-localization';
// import i18n from 'i18n-js';

const App = () => {

  const [state, setState] = useState({
    cameraPermission: false,
    mediaPermission: false,
    root: 'Landing'
  })

  const [loaded] = useFonts(
    {
      SpookyFont: require('./assets/fonts/Halloween-Too.ttf')
    }
  );

  //Vorrei che i controlli li facesse on tap sul bottone della fotocamera
  const checkPermissions = async () => {
    const cameraPermission = await Camera.requestPermissionsAsync();
    const mediaPermission = await MediaLibrary.requestPermissionsAsync()

    setState({
      ...state,
      cameraPermission: cameraPermission.status === 'granted',
      mediaPermission: mediaPermission.status === 'granted'
    })
  }

  useEffect(() => {
    checkPermissions()
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        (!loaded || !state.cameraPermission || !state.mediaPermission) &&
        <ActivityIndicator />
      }
      {
        loaded && state.cameraPermission && state.mediaPermission &&
        <EntryApp root={state.root} />
      }

    </SafeAreaView>
  );
}

export default App