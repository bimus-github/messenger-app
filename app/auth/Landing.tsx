import { Image, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View } from "@/components/Themed";
import { landing_image } from "@/constants/images";
import Gap from "@/components/Gap";
import { sreenHeight, sreenWidth } from "@/constants/Dimensions";
import { useRouter } from "expo-router";

const Landing = () => {
  const router = useRouter();

  const handleGetStart = () => {
    router.push("/auth/AuthWithPhoneNumber");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={landing_image} style={styles.image} />
        <Text style={styles.title}>
          Connect easily with your family and friends over countries
        </Text>
        <Gap vertical={sreenHeight * 0.1} />
        <Text>Terms & Privacy Policy</Text>
        <Gap vertical={sreenHeight * 0.03} />
        <Button
          onPress={handleGetStart}
          text="Get Started"
          style={styles.btn}
        />
      </View>
    </SafeAreaView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
  title: {
    width: 271,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "",
    fontWeight: "bold",
  },
  link: {
    fontSize: 14,
    fontFamily: "",
    fontWeight: "600",
  },
  btn: {
    width: sreenWidth * 0.8,
    height: 57,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
