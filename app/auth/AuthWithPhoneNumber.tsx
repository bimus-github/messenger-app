import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  PhoneNumberInput,
  Text,
  View,
} from "@/components/Themed";
import { useRouter } from "expo-router";
import Gap from "@/components/Gap";
import { sreenHeight, sreenWidth } from "@/constants/Dimensions";
import Header from "@/components/auth/Header";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { app, auth } from "@/firebase";
import { ConfirmationResult, signInWithPhoneNumber } from "firebase/auth";
import CheckingNumber from "./CheckingNumber";
import { User_Status, User_Type } from "@/models/type";
import { setUser } from "@/firebase/functions/user";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/store/slices/user";

const AuthWithPhoneNumber = () => {
  const dispatch = useAppDispatch();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleContinue = async () => {
    const phone = `+${phoneCode}${phoneNumber}`;
    setPhone(phone);
    setIsLoading(true);
    signInWithPhoneNumber(auth, phone, recaptchaVerifier.current as any)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setIsVerifying(true);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCodeFilled = (code: string) => {
    if (confirmationResult && code.length === 6) {
      setIsLoading(true);
      confirmationResult
        .confirm(code)
        .then((result) => {
          const newUser: User_Type = {
            id: result.user.uid,
            fName: "",
            lName: "",
            phone,
            image: "",
            status: User_Status.ONLINE,
          };

          setUser(newUser).then(() => {
            dispatch(userActions.setUser(newUser));
            router.push("/messenger/Chats");
          });
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {isVerifying ? (
        <CheckingNumber
          phone={phone}
          isLoading={isLoading}
          onCodeFilled={onCodeFilled}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Header />
            <Gap vertical={sreenHeight * 0.1} />
            <Text style={styles.title}>Enter Your Phone Number</Text>
            <Gap vertical={sreenHeight * 0.01} />
            <Text style={styles.extraTitle}>
              Please confirm your country code and enter your phone number
            </Text>
            <Gap vertical={sreenHeight * 0.1} />
            {isLoading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <PhoneNumberInput
                onChangeText={(text) => setPhoneNumber(text)}
                onChangeCountry={(text) => setPhoneCode(text.callingCode[0])}
                containerStyle={{ width: "100%" }}
              />
            )}
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={app.options}
            />
            <Gap vertical={sreenHeight * 0.35} />
            <View style={{ alignItems: "center" }}>
              <Button
                onPress={handleContinue}
                text="Continue"
                style={styles.btn}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
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
