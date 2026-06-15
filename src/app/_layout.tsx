import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../../global.css";
import { persistor, store } from "./../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
