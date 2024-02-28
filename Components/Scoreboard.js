import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View, Pressable, Platform } from "react-native";
import { DataTable, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../Style/style";
import Footer from "./Footer";
import Header from "./Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SCOREBOARD_KEY } from "../constants/Game";
import { moderateScale, verticalScale } from "../metrics/Metrics";

const Scoreboard = ({ navigation }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        const parsedScores = JSON.parse(jsonValue);
        const sortedScores = parsedScores.sort((a, b) => b.points - a.points);
        setScores(sortedScores.slice(0, 3));
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
      setScores([]);
      Alert.alert(
        "Scoreboard Cleared",
        "The scoreboard has been cleared successfully."
      );
    } catch (error) {
      console.log("Error:", error.message);
      Alert.alert("Error", "Failed to clear the scoreboard.");
    }
  };

  const ListIcon = () => (
    <MaterialCommunityIcons
      name="view-list"
      style={[styles.listIcon, { fontSize: moderateScale(90) }]}
    />
  );

  return (
    <>
      <View style={styles.scoreboardContainer}>
        <Header />
        <ScrollView
          style={[
            Platform.OS === "ios" ? styles.iosScroll : styles.androidScroll,
            { height: 400 },
          ]}
        >
          <View>
            <ListIcon />
            <Text style={styles.rulesTitel}>Top Three</Text>
          </View>

          {scores.length === 0 ? (
            <Text style={styles.rulesText}>Scoreboard is empty</Text>
          ) : (
            <View style={[styles.scrollContainer, styles.scoreboardContainer]}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title
                    style={{
                      width: moderateScale(150),
                    }}
                  >
                    Player
                  </DataTable.Title>
                  <DataTable.Title
                    style={{
                      width: moderateScale(200),
                    }}
                  >
                    Date & Time
                  </DataTable.Title>
                  <DataTable.Title
                    style={{
                      width: moderateScale(100),
                    }}
                    numeric
                  >
                    Points
                  </DataTable.Title>
                </DataTable.Header>
                {scores.map((player, i) => (
                  <DataTable.Row key={i}>
                    <DataTable.Cell
                      style={{
                        width: moderateScale(150),
                        ...styles.rulesText,
                      }}
                    >
                      {i + 1}. {player.name}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{
                        width: moderateScale(200),
                        ...styles.rulesText,
                      }}
                    >
                      {player.date} {player.time}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{
                        width: moderateScale(100),
                        ...styles.rulesText,
                      }}
                      numeric
                    >
                      {player.points}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          )}

          <View
            style={[styles.centeredContent, { marginTop: verticalScale(20) }]}
          >
            <Pressable style={styles.buttonS} onPress={clearScoreboard}>
              <Text style={styles.buttonText}>Clear Scoreboard</Text>
            </Pressable>
          </View>
        </ScrollView>
        <Footer />
      </View>
    </>
  );
};

export default Scoreboard;
