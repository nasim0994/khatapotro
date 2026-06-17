import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  fontRegular: {
    fontFamily: "Poppins-Regular",
  },
  fontMedium: {
    fontFamily: "Poppins-Medium",
  },
  fontSemiBold: {
    fontFamily: "Poppins-SemiBold",
  },
  fontBold: {
    fontFamily: "Poppins-Bold",
  },

  primaryButton: {
    width: "full" as any,
    backgroundColor: "#2F80ED",
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2F80ED",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },

  inputField: {
    width: "100%",
    height: 54,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "#FFFFFF",
    fontSize: 16,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#0D1117",
    justifyContent: "center",
    alignItems: "center",
  },

  inputFieldBox: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  fieldInputText: {
    color: "#FFFFFF",
    flex: 1,
    fontFamily: "Poppins-Regular",
    marginTop: 2,
  },
});
