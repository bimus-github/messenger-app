import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { Button, PhoneNumberInput, Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import Gap from "@/components/Gap";
import { sreenHeight, sreenWidth } from "@/constants/Dimensions";
import Header from "@/components/auth/Header";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { app, auth } from "@/firebase";
import { signInWithPhoneNumber } from "firebase/auth";

const AuthWithPhoneNumber = () => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleContinue = async () => {
    const phone = `+${phoneCode}${phoneNumber}`;
    setIsLoading(true);
    const result = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier.current as any
    );
    setIsLoading(false);
    console.log(result);
  };
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
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
        />
        <PhoneNumberInput
          onChangeText={(text) => setPhoneNumber(text)}
          onChangeCountry={(text) => setPhoneCode(text.callingCode[0])}
          containerStyle={{ width: "100%" }}
        />
        <Gap vertical={sreenHeight * 0.3} />
        <View style={{ alignItems: "center" }}>
          <Button onPress={handleContinue} text="Continue" style={styles.btn} />
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
