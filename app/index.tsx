import { ActivityIndicator, Text, View } from "@/components/Themed";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => (
  <SafeAreaView>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
      <Text>App</Text>
    </View>
  </SafeAreaView>
);

export default App;
