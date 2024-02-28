import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Components/Home";
import Gameboard from "./Components/Gameboard";
import Scoreboard from "./Components/Scoreboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./Style/style";
import * as Font from "expo-font";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Warte, bis die Schriftarten geladen sind
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500}
    >
      <View style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "information" : "information-outline";
                } else if (route.name === "Gameboard") {
                  iconName = focused
                    ? "dice-multiple"
                    : "dice-multiple-outline";
                } else if (route.name === "Scoreboard") {
                  iconName = focused ? "view-list" : "view-list-outline";
                }
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "orange",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{ tabBarStyle: { display: "none" } }}
            />
            <Tab.Screen name="Gameboard" component={Gameboard} />
            <Tab.Screen name="Scoreboard" component={Scoreboard} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </KeyboardAvoidingView>
  );
}
