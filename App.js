import React, { useState, useEffect } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { StatusBar } from "expo-status-bar";

import * as Font from 'expo-font';
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading'
import ReduxThunk from 'redux-thunk';
import Navigation from "./navigation";


import waterReducer from './store/water-reducer';


const rootReducer = combineReducers({
  water: waterReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'inconsolata-regular': require('./assets/fonts/Inconsolata-Regular.ttf'),
    'inconsolata-bold': require('./assets/fonts/Inconsolata-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={()=>console.log("error")}
      />
    );
  }

  return (
 
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}