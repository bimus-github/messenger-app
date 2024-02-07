import { View } from "react-native";
import React from "react";

interface GapProps {
  horithontal?: number;
  vertical?: number;
}

const Gap = ({ horithontal = 1, vertical = 1 }: GapProps) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        width: horithontal,
        height: vertical,
      }}
    />
  );
};

export default Gap;
