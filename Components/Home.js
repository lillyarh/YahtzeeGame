import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import styles from "../Style/style";
import Footer from "./Footer";
import Header from "./Header";
import { MaterialIcons } from "@expo/vector-icons";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
} from "../constants/Game";
import { moderateScale } from "../metrics/Metrics";

export default function Home({ navigation }) {
  const [playerName, setPlayerName] = useState("");
  const [rulesVisible, setRulesVisible] = useState(false);

  const handleNameSubmit = () => {
    playerName.trim() === "" ? alert("Name is empty") : setRulesVisible(true);
  };

  const handlePlayPress = () => {
    navigation.navigate("Gameboard", { playerName });
  };

  const HomeIcon = () => <MaterialIcons style={styles.homeIcon} name="info" />;

  return !rulesVisible ? (
    <KeyboardAvoidingView
      style={{ ...styles.homeContainer, height: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <View style={[styles.centered, styles.flexColumn, { flexGrow: 1 }]}>
        <HomeIcon />
        <Text style={styles.centeredText}>
          For scoreboard, enter your name...
        </Text>
        <TextInput
          style={[styles.input, styles.centered, styles.rulesText]}
          placeholder="name"
          value={playerName}
          onChangeText={setPlayerName}
          autoFocus={true}
        />
        <Pressable style={styles.button} onPress={handleNameSubmit}>
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
      </View>
      <Footer />
    </KeyboardAvoidingView>
  ) : (
    <View
      style={[styles.container, { height: "100%" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <View style={{ flexGrow: 1 }}>
        <ScrollView
          style={[
            Platform.OS === "ios" ? styles.iosScroll : styles.androidScroll,
            ,
          ]}
        >
          <HomeIcon />
          <Text style={styles.rulesTitel}>Rules of the Game</Text>
          <View style={[styles.rulesContainer, styles.centered]}>
            <Text style={styles.rulesText}>
              THE GAME: Upper section of the classic Yahtzee dice game. You have{" "}
              {NBR_OF_DICES} dices and for every dice you have {NBR_OF_THROWS}{" "}
              throws. After each throw, you can keep dices in order to get the
              same dice spot counts as many as possible. In the end of the turn,
              you must select your points from {MIN_SPOT} to {MAX_SPOT}. Game
              ends when all points have been selected. The order for selecting
              those is free.
            </Text>
            <Text style={[styles.rulesText, { textAlign: "center" }]}>
              POINTS: After each turn, the game calculates the sum for the dices
              you selected. Only the dices having the same spot count are
              calculated. Inside the game, you cannot select the same points
              from {MIN_SPOT} to {MAX_SPOT} again.
            </Text>
            <Text style={styles.rulesText}>
              GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT}{" "}
              points is the limit of getting a bonus which gives you{" "}
              {BONUS_POINTS} points more.
            </Text>
            <Text style={styles.rulesText}>
              <Text style={{ fontWeight: "bold", fontSize: moderateScale(20) }}>
                Good luck,{" "}
              </Text>
              <Text
                style={[
                  styles.rulesText,
                  { fontWeight: "bold", fontSize: moderateScale(20) },
                ]}
              >
                {"" + playerName + "!"}
              </Text>
            </Text>
          </View>
          <View style={[styles.centered, styles.flexColumn]}>
            <Pressable style={styles.button} onPress={handlePlayPress}>
              <Text style={styles.buttonText}>PLAY</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
}
