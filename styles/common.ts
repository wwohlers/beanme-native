import {StyleSheet} from 'react-native';
import Colors from "../constants/Colors";

export const commonStyles = StyleSheet.create({
  container: {
    paddingHorizontal: "4%",
    paddingVertical: 12,
  },

  title: {
    fontSize: 24,
    marginVertical: 6
  },

  label: {
    fontSize: 13,
    textTransform: "uppercase",
    color: Colors.light.medium
  },

  inputLabel: {
    fontSize: 14,
    textTransform: "uppercase",
    marginVertical: 4
  },

  textInput: {
    borderWidth: 1,
    borderColor: Colors.light.borders,
    fontSize: 18,
    padding: 6,
    color: Colors.light.text
  },

  tile: {
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 2,
    marginBottom: 8
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
  }
})
