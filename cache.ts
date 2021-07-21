import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

// Load all the fonts
const LoadFonts = async () => {
  await Font.loadAsync({
    Poppins: require("./assets/static/Poppins-Regular.ttf"),
    Inter: require("./assets/static/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/static/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/static/Inter-Bold.ttf"),
  });
};

// Load local data
const LoadData = async () => {};

const LoadCache = async () => {
  await LoadFonts();

  console.log("Cached");
};
export default LoadCache;
