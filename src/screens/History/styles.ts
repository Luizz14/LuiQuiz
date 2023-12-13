import { StyleSheet } from "react-native";

import { THEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },

  history: {
    flexGrow: 1,
    padding: 32,
  },

  swipeableRemove: {
    width: 90,
    height: 90,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  swipeableRemoveContainer: {
    width: "100%",
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    borderRadius: 6,
    height: 88,
    marginBottom: 12,
  },
});