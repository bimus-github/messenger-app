import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "../Themed";
import { chevron_left } from "@/constants/icons";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.header} onPress={() => router.back()}>
      <Icon source={chevron_left} style={styles.backBtn} />
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  backBtn: {
    width: 24,
    height: 24,
    padding: 24,
  },
});
