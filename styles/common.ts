import {StyleSheet} from 'react-native';
import Colors from "../constants/Colors";

export const commonStyles = StyleSheet.create({
  container: {
    paddingHorizontal: "4%",
    paddingVertical: 12,
  },

  title: {
    fontSize: 24,
  },

  inputLabel: {
    fontSize: 14,
    textTransform: "uppercase",
    marginVertical: 4
  },

  textInput: {
    borderWidth: 1,
    borderColor: Colors.light.borders,
    fontFamily: "DMSans_400Regular",
    fontSize: 18,
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: Colors.light.text
  },

  tile: {
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 2,
    marginBottom: 16,
    elevation: 4,
  },

  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  error: {
    color: Colors.light.error,
    fontSize: 12,
    marginVertical: 4
  },

  buttonTitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16
  }
})
