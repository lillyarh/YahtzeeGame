import React, { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView, Platform } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../Style/style";
import Footer from "./Footer";
import Header from "./Header";
import { moderateScale } from "../metrics/Metrics";
import { SCOREBOARD_KEY } from "../constants/Game";

let board = [];
let nbrSum = [0, 0, 0, 0, 0, 0];
let nbrSelectPossible = false;
let diceSelectPossible = false;
let throwPossible = true;
let getBonus = false;
let gameOver = false;

const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const SUM_FOR_BONUS = 63;
const BONUS = 35;

export default function Gameboard({ route }) {
  const { playerName } = route.params;
  const [showDiceIcon, setShowDiceIcon] = useState(true);
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [sum, setSum] = useState(0);
  const [status, setStatus] = useState("");
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [usedNbrs, setUsedNbrs] = useState(new Array(6).fill(false));
  const [scores, setScores] = useState([]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        const parsedScores = JSON.parse(jsonValue);
        const sortedScores = parsedScores.sort((a, b) => b.points - a.points);
        setScores(sortedScores.slice(0, 5));
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const saveScore = async () => {
    const scoreData = {
      name: playerName,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      points: sum,
    };

    try {
      const newScore = [...scores, scoreData];
      const jsonValue = JSON.stringify(newScore);

      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
    } catch (error) {
      console.log("Error saving score:", error.message);
    }
  };

  const diceRow = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    diceRow.push(
      <Pressable key={"row" + i} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={moderateScale(65)}
          color={selectedDices[i] ? "black" : "orange"}
        />
      </Pressable>
    );
  }

  function selectDice(i) {
    if (diceSelectPossible) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else setStatus("You have to throw dices first.");
  }

  function throwDices() {
    if (throwPossible && !gameOver) {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = "dice-" + randomNumber;
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setShowDiceIcon(false);
    } else if (gameOver) {
      newGame();
    }
  }

  const nbrRow = [];
  for (let i = 0; i < 6; i++) {
    nbrRow.push(
      <View style={styles.numbers} key={"nbrRow" + i}>
        <Text style={styles.nbrSum}>{nbrSum[i]}</Text>
        <Pressable key={"nbrRow" + i} onPress={() => useNbr(i)}>
          <MaterialCommunityIcons
            name={"numeric-" + (i + 1) + "-circle"}
            key={"nbrRow" + i}
            size={moderateScale(50)}
            color={usedNbrs[i] ? "black" : "orange"}
          />
        </Pressable>
      </View>
    );
  }

  function useNbr(i) {
    if (throwPossible && !gameOver) {
      setStatus("Throw 3 times before setting points.");
    } else {
      let nbrs = [...usedNbrs];
      if (nbrSelectPossible && !nbrs[i]) {
        nbrs[i] = true;
        setUsedNbrs(nbrs);
        var tempSum = 0;
        for (let x = 0; x < diceRow.length; x++) {
          var diceVal = parseInt(board[x].match(/(\d+)/)[0]);
          if (diceVal - 1 === i) {
            tempSum += diceVal;
          }
        }
        if (nbrSum[i] === 0) {
          nbrSum[i] = tempSum;
          setSum(sum + parseInt(tempSum));
          setSelectedDices(new Array(NBR_OF_DICES).fill(false));
          setNbrOfThrowsLeft(3);
        } else {
          setStatus(`You already selected points for ${i + 1}.`);
        }
      } else if (nbrs[i]) {
        setStatus(`You already selected points for ${i + 1}.`);
      } else {
        setStatus("You have to throw dices first.");
      }
    }
  }

  useEffect(() => {
    getScoreboardData();
    if (nbrOfThrowsLeft === 0 && !gameOver) {
      setStatus("Select your points before next throw.");
      throwPossible = false;
      nbrSelectPossible = true;
    } else if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameOver) {
      setStatus("Throw again or select a number.");
      throwPossible = true;
      nbrSelectPossible = true;
      diceSelectPossible = true;
    } else if (
      nbrOfThrowsLeft === NBR_OF_THROWS &&
      !usedNbrs.every((x) => x === true)
    ) {
      setStatus("Throw the dices.");
      throwPossible = true;
      nbrSelectPossible = false;
      diceSelectPossible = false;
    } else if (
      nbrOfThrowsLeft === NBR_OF_THROWS &&
      usedNbrs.every((x) => x === true)
    ) {
      setStatus("Game over! All points selected.");
      throwPossible = false;
      diceSelectPossible = false;
      nbrSelectPossible = false;
      gameOver = true;

      saveScore();
      setNbrOfThrowsLeft(0);
    }
  }, [nbrOfThrowsLeft]);

  function checkBonus() {
    if (sum >= SUM_FOR_BONUS) {
      getBonus = true;
      return "Congrats! Bonus points (50) added.";
    } else {
      return (
        "You are " + (SUM_FOR_BONUS - sum) + " points away from the bonus."
      );
    }
  }

  const DiceIcon = () => (
    <MaterialCommunityIcons style={styles.diceIcon} name="dice-multiple" />
  );

  const newGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setSum(0);
    setStatus(gameOver ? "Throw the dices." : "");
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setUsedNbrs(new Array(6).fill(false));
    setShowDiceIcon(true);

    board = [];
    nbrSum = [0, 0, 0, 0, 0, 0];
    nbrSelectPossible = false;
    diceSelectPossible = false;
    throwPossible = true;
    getBonus = false;
    gameOver = false;
  };

  const handleThrowDices = () => {
    if (nbrOfThrowsLeft > 0 && !gameOver) {
      throwDices();
    } else if (gameOver) {
      newGame();
    }
  };

  return (
    <>
      <Header />
      <View style={styles.gameboard}>
        <ScrollView
          style={[
            Platform.OS === "ios" ? styles.iosScroll : styles.androidScroll,
            { height: 400 },
          ]}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showDiceIcon && <DiceIcon />}
          <View style={[styles.centeredContent, styles.row]}>{diceRow}</View>
          <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
          <Text style={styles.gameinfo}>{status}</Text>
          <Pressable style={styles.buttonG} onPress={handleThrowDices}>
            <Text style={styles.buttonText}>
              {gameOver ? "New Game" : "Throw dices"}
            </Text>
          </Pressable>
          <Text style={[styles.gameinfo, styles.totalText]}>
            Total: {getBonus ? sum + BONUS : sum}
          </Text>
          <Text style={styles.gameinfo}>{checkBonus()}</Text>
          <View style={[styles.row]}>{nbrRow}</View>
          <Text
            style={[
              styles.gameinfo,
              { fontWeight: "bold", fontSize: moderateScale(20) },
            ]}
          >
            Player: {playerName}
          </Text>
        </ScrollView>
        <Footer />
      </View>
    </>
  );
}
