import Gap from "@/components/Gap";
import { Button, OTPInput, Text, View } from "@/components/Themed";
import Header from "@/components/auth/Header";
import Colors from "@/constants/Colors";
import { sreenHeight, sreenWidth } from "@/constants/Dimensions";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckingNumber = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header />
        <Gap vertical={sreenHeight * 0.1} />
        <Text style={styles.title}>Enter Code</Text>
        <Gap vertical={sreenHeight * 0.01} />
        <Text style={styles.extraTitle}>
          We have sent you an SMS with the code to +62 1309 - 1710 - 1920
        </Text>
        <OTPInput
          autoFocusOnLoad
          pinCount={4}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <Gap vertical={sreenHeight * 0.4} />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity>
            <Text
              style={[
                {
                  color:
                    colorScheme === "light"
                      ? Colors.light.text_secondary
                      : Colors.dark.text_secondary,
                },
              ]}
            >
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckingNumber;

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
