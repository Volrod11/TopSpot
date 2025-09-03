import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SearchPage from "../pages/SearchPage";
import { HomeScreenStackParamList } from "../../types";
import PicturePage from "../pages/PicturePage";
import GaragePage from "../pages/GaragePage";


const Stack = createNativeStackNavigator<HomeScreenStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          presentation: "transparentModal", // transition fluide
          animation: "slide_from_bottom", // effet qui monte
          headerShown: false, // pas de header
        }}
      />
      <Stack.Screen
        name="PicturePage"
        component={PicturePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GaragePage"
        component={GaragePage}
        options={{ headerShown: false }}
      />
      {/* autres stacks ou pages */}
    </Stack.Navigator>
  );
}
