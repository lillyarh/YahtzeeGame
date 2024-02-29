import { StyleSheet } from "react-native";
import { verticalScale, moderateScale } from "../metrics/Metrics";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";

const getResponsiveFontSize = (baseFontSize) => {
  const scaleFactor = verticalScale(1.0);
  return baseFontSize * scaleFactor;
};

const styles = StyleSheet.create({
  // Hintergrund Regelseite
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Design Header
  header: {
    backgroundColor: "grey",
    justifyContent: "center",
    width: "100%",
  },
  // Header Schrift
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: moderateScale(18),
    textAlign: "center",
    margin: moderateScale(10),
    fontFamily: "Roboto_400Regular",
  },

  // Design Footer
  footer: {
    backgroundColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  // Footer Schrift
  author: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: moderateScale(18),
    textAlign: "center",
    margin: moderateScale(10),
    fontFamily: "Roboto_400Regular",
  },

  // Inhalt Home
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Inhalt Scoreboard
  scoreboardContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Regelseite
  rulesContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: moderateScale(15),
    marginVertical: moderateScale(10),
  },
  // Überschrift
  rulesTitel: {
    fontSize: moderateScale(22),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
  },
  // Fließtext
  rulesText: {
    textAlign: "center",
    marginBottom: moderateScale(5),
    marginTop: moderateScale(5),
    fontSize: getResponsiveFontSize(14),
  },

  // Inhalt Gameboard
  gameboard: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center", // Button mittig
    justifyContent: "center",
    display: "flex",
  },

  // Fließtext Gameboard
  gameinfo: {
    backgroundColor: "#fff",
    textAlign: "center",
    marginBottom: moderateScale(5),
    fontSize: moderateScale(20),
    marginTop: moderateScale(5),
  },

  totalText: {
    fontWeight: "bold",
  },

  // Abstände im Gameboard
  row: {
    marginTop: moderateScale(10),
    padding: moderateScale(5),
    flexDirection: "row",
  },

  // Anordnung aufzählende Nummern (Kreise)
  flex: {
    flex: 1,
    flexDirection: "row",
    marginBottom: moderateScale(1),
  },
  // Nummern mittig über Kreisen
  numbers: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(30),
  },

  nbrSum: {
    fontSize: moderateScale(16),
  },

  // Button (Home, Gameboard)
  button: {
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
    marginVertical: moderateScale(10),
    flexDirection: "row",
    padding: moderateScale(10),
    backgroundColor: "orange",
    width: moderateScale(90),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonG: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    marginVertical: moderateScale(10),
    flexDirection: "row",
    padding: moderateScale(10),
    backgroundColor: "orange",
    width: moderateScale(170),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    //alignItems: "center",
  },
  buttonS: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(150),
    //marginVertical: moderateScale(70),
    flexDirection: "row",
    padding: moderateScale(10),
    backgroundColor: "orange",
    width: moderateScale(220),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: moderateScale(24),
    fontWeight: "bold",
    textAlign: "center",
  },

  // Eingabe etc. Home
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: moderateScale(40),
    paddingLeft: moderateScale(10),
    width: moderateScale(200),
    textAlign: "center",
  },
  flexColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  // Icons für die Seiten und Navigation
  homeIcon: {
    textAlign: "center",
    color: "orange",
    fontSize: moderateScale(80),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  diceIcon: {
    textAlign: "center",
    color: "orange",
    fontSize: moderateScale(80),
    marginTop: moderateScale(20),
    //marginBottom: moderateScale(20),
    //padding: moderateScale(5),
  },
  listIcon: {
    textAlign: "center",
    color: "orange",
    fontSize: moderateScale(70),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
  },

  // Footer rutscht automatisch beim öffnen der Tastatur hoch
  keyboardAvoidingContainer: {
    flex: 1,
  },

  // Inhalt Scoreboard
  scoreboardContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Fließtext zentriert
  centeredText: {
    textAlign: "center",
    fontSize: moderateScale(20),
    marginTop: moderateScale(10),
    fontWeight: "bold",
  },

  // Elemente im Scoreboard
  scoreboardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: moderateScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "gray",
    width: "100%",
  },

  // Spielerinformationen zentriert in einer Zeile
  centeredPlayerInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  // Stil für den Text in der Spielerinformation
  centeredPlayerInfoText: {
    marginLeft: moderateScale(10),
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(20),
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(20),
  },
  centered: {
    justifyContent: "center",
    textAlign: "center",
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
  },
});

export default styles;
