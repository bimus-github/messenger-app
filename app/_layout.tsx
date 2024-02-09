import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Checking_Account_Status } from "@/models/type";
import { ColorSchemeName } from "react-native";
import { Provider } from "react-redux";
import store from "@/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/firebase/functions/user";
import { userActions } from "@/store/slices/user";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Mulish: require("../assets/fonts/Mulish-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <Checking />
    </Provider>
  );
}

const Checking = () => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [accountStatus, setAccountStatus] = useState<Checking_Account_Status>(
    Checking_Account_Status.CHECKING
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid);

        getUser(user.uid)
          .then((user) => {
            router.push("/messenger/Chats");
            setAccountStatus(Checking_Account_Status.SIGNED_IN);
            dispatch(userActions.setUser(user));
          })
          .catch(() => {
            router.push("/auth/Landing");
            setAccountStatus(Checking_Account_Status.LOGED_OUT);
            dispatch(userActions.setUser(null));
          });
      } else {
        console.log(user);

        router.push("/auth/Landing");
        setAccountStatus(Checking_Account_Status.LOGED_OUT);
      }
    });
  }, [dispatch, router]);

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      {accountStatus === Checking_Account_Status.CHECKING && (
        <LoadingPage colorScheme={colorScheme} />
      )}
      {accountStatus === Checking_Account_Status.LOGED_OUT && (
        <AuthPages colorScheme={colorScheme} />
      )}
      {accountStatus === Checking_Account_Status.SIGNED_IN && (
        <MessengerPages colorScheme={colorScheme} />
      )}
    </ThemeProvider>
  );
};

const LoadingPage = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
  <Stack
    screenOptions={{
      contentStyle: {
        backgroundColor:
          colorScheme === "light" ? Colors.light.bg_main : Colors.dark.bg_main,
      },
      headerShown: false,
    }}
  >
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
);

const AuthPages = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
  <Stack
    screenOptions={{
      contentStyle: {
        backgroundColor:
          colorScheme === "light" ? Colors.light.bg_main : Colors.dark.bg_main,
      },
      headerShown: false,
    }}
  >
    <Stack.Screen name="auth/AuthWithPhoneNumber" />
    <Stack.Screen name="auth/Landing" />
    <Stack.Screen name="auth/CheckingNumber" />
  </Stack>
);

const MessengerPages = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
  <Stack
    screenOptions={{
      contentStyle: {
        backgroundColor:
          colorScheme === "light" ? Colors.light.bg_main : Colors.dark.bg_main,
      },
      headerShown: false,
    }}
  >
    <Stack.Screen name="messenger/Chats" />
  </Stack>
);
