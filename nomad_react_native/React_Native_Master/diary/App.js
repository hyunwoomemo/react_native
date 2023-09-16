import Realm from 'realm';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Navigator from './navigator';
import * as SplashScreen from 'expo-splash-screen';
import { DBContext } from './context';

const FeelingSchema = {
  name: 'Feeling',
  properties: {
    _id: 'int',
    emotion: "string",
    message: "string",
  },
  primaryKey: '_id'
}

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);

  const startLoading = async () => {
    const connection = await Realm.open({
      path: 'DiaryDB',
      schema: [FeelingSchema]
    })
    setRealm(connection)
    setReady(true)
  }

  useEffect(() => {
    startLoading()
  }, [])



  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer onLayout={onLayoutRootView}>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
