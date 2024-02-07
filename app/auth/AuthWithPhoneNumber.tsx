import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  Button,
  Icon,
  PhoneNumberInput,
  Text,
  View,
} from "@/components/Themed";
import { chevron_left } from "@/constants/icons";
import { useRouter } from "expo-router";
import Gap from "@/components/Gap";
import { sreenHeight, sreenWidth } from "@/constants/Dimensions";
import Header from "@/components/auth/Header";

const AuthWithPhoneNumber = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header />
        <Gap vertical={sreenHeight * 0.1} />
        <Text style={styles.title}>Enter Your Phone Number</Text>
        <Gap vertical={sreenHeight * 0.01} />
        <Text style={styles.extraTitle}>
          Please confirm your country code and enter your phone number
        </Text>
        <Gap vertical={sreenHeight * 0.15} />
        <PhoneNumberInput containerStyle={{ width: "100%" }} />
        <Gap vertical={sreenHeight * 0.3} />
        <View style={{ alignItems: "center" }}>
          <Button
            onPress={() => {
              router.push("/auth/CheckingNumber");
            }}
            text="Get Started"
            style={styles.btn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthWithPhoneNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "",
  },
  extraTitle: {
    fontSize: 14,
    textAlign: "center",
  },
  btn: {
    width: sreenWidth * 0.8,
    height: 57,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
