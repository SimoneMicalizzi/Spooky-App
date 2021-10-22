import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import headbar from './assets/styles/headbar.js';
// SCREENS
import Landing from './screens/Landing.js';
import Main from './screens/Main.js';
import EditPhoto from './screens/EditPhoto.js';
const EntryApp = (props) => {

  const Stack = createStackNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={props.root}
        // screenOptions={{
        //   headerShown: false
        // }}
        >
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={headbar}
          />

          <Stack.Screen
            name="Main"
            component={Main}
            options={headbar}
          />
          <Stack.Screen
            name="EditPhoto"
            component={EditPhoto}
            options={headbar}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default EntryApp;