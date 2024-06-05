import { NativeBaseProvider } from "native-base";

import { Provider, useDispatch } from "react-redux";
import store from "./src/store";
import { useEffect, useState } from "react";
import customTheme from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import AppStack from "./src/navigation/AppStack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import api from "./src/api";
import { setUser } from "./src/features/todo/userSlice";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        // Load token from AsyncStorage
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          const userResponse = await api.get("profile/me");
          store.dispatch(
            setUser({ token: token, user: userResponse.data.data })
          );
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync(); // Hide the splash screen
      }
    };
    loadResourcesAndDataAsync();
  }, []);

  useEffect(() => {
    // Subscribe to store updates
    const unsubscribe = store.subscribe(() => {
      setAuthenticated(store.getState().user.isAuthenticated);
    });

    // Cleanup subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return null; // Render nothing while loading
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          {authenticated ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
