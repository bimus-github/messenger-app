import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
  Image as DefaultImage,
  ActivityIndicator as DefaultActivityIndicator,
} from "react-native";

import PhoneInput from "react-native-phone-number-input";

import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity["props"] & { text: string };
export type IconProps = ThemeProps & DefaultImage["props"];
export type PhoneNumberInputProps = ThemeProps & PhoneInput["props"];

export type ActivityIndicatorProps = ThemeProps &
  DefaultActivityIndicator["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text_main"
  );

  return (
    <DefaultText
      style={[
        {
          color: color,
          fontFamily: "Mulish",
          fontSize: 16,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "bg_main"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, text, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "bg_btn"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text_btn"
  );

  return (
    <DefaultTouchableOpacity
      style={[{ backgroundColor }, style]}
      {...otherProps}
    >
      <DefaultText
        style={[
          { color, fontFamily: "Mulish", fontSize: 16, fontWeight: "700" },
        ]}
      >
        {text}
      </DefaultText>
    </DefaultTouchableOpacity>
  );
}

export function Icon(props: IconProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text_main"
  );

  return <DefaultImage style={[{ tintColor: color }, style]} {...otherProps} />;
}

export function PhoneNumberInput(props: PhoneNumberInputProps) {
  const colorScheme = useColorScheme();
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text_placeholder"
  );
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "bg_input"
  );
  return (
    <PhoneInput
      textInputStyle={[{ color, backgroundColor }]}
      textContainerStyle={[{ backgroundColor }]}
      codeTextStyle={[{ color }]}
      containerStyle={[{ backgroundColor }]}
      countryPickerButtonStyle={[{ backgroundColor }]}
      {...otherProps}
      withDarkTheme={colorScheme === "dark"}
    />
  );
}

export function ActivityIndicator(props: ActivityIndicatorProps) {
  const color = useThemeColor(
    { light: Colors.light.text_main, dark: Colors.dark.text_main },
    "text_main"
  );
  return <DefaultActivityIndicator color={color} {...props} />;
}
