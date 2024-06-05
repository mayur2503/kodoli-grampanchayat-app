import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CustomerScreen from "../screens/CustomerScreen";
import CustomerDetailsScreen from "../screens/CustomerDetailsScreen";
import ReadingScreen from "../screens/ReadingScreen";
import AddReading from "../screens/AddReading";
import PendingReadings from "../screens/PendingReadings";
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Customer" component={CustomerScreen} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
      <Stack.Screen name="ReadingScreen" component={ReadingScreen} />
      <Stack.Screen name="AddReading" component={AddReading} />
      <Stack.Screen name="PendingReadings" component={PendingReadings} />
    </Stack.Navigator>
  );
}
