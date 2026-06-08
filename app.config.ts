import { ExpoConfig } from "expo/config";

const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? "";
const iosUrlScheme = iosClientId
  ? `com.googleusercontent.apps.${iosClientId.replace(".apps.googleusercontent.com", "")}`
  : "";

const config: ExpoConfig = {
  name: "DayOne",
  slug: "DayOne",
  version: "1.0.3",
  scheme: "dayone",
  userInterfaceStyle: "automatic",
  icon: "./src/assets/brand/launch-icon.png",
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#0A0A0B",
        image: "./src/assets/brand/splash-icon.png",
        dark: {
          image: "./src/assets/brand/splash-icon.png",
          backgroundColor: "#0A0A0B",
        },
        imageWidth: 200,
      },
    ],
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme,
      },
    ],
    "expo-apple-authentication",
  ],
  android: {
    package: "com.bytebuilder123.DayOne",
  },
  ios: {
    bundleIdentifier: "com.bytebuilder123.DayOneHabitTracker",
    usesAppleSignIn: true,
  },
};

export default config;
