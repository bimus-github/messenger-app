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
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [accountStatus, setAccountStatus] = useState<Checking_Account_Status>(
    Checking_Account_Status.CHECKING
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/auth/Landing");
      setAccountStatus(Checking_Account_Status.LOGED_OUT);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      {accountStatus === Checking_Account_Status.CHECKING && (
        <CheckingPage colorScheme={colorScheme} />
      )}
      {accountStatus === Checking_Account_Status.LOGED_OUT && (
        <AuthPages colorScheme={colorScheme} />
      )}
    </ThemeProvider>
  );
}

const CheckingPage = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
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
