import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Box, Text ,Center} from "native-base";
import Entypo from "@expo/vector-icons/Entypo";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/todo/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Box safeAreaTop bg="background.50" style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        {/* Content for the first row */}
        <TouchableOpacity
          style={{
            flex: 1,
          }}
        >
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text fontWeight={"bold"} fontSize={30} color={"tertiary.800"}>
              Grampanchayat
            </Text>
            <Text fontWeight={"bold"} fontSize={30} color={"secondary.600"}>
              Kodoli
            </Text>
          </Box>
        </TouchableOpacity>
      </View>
      <Box style={{ flex: 4 }}>
        {/* Content for the second row */}
        <Box p={5} flex={1} justifyContent="center">
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() => navigation.navigate("Customer")}
          >
            <Box
              bg="tertiary.50"
              flex={1}
              justifyContent="center"
              alignItems="center"
              borderRadius={10}
            >
              <Entypo name="users" size={40} color="#337d85" />
              <Text fontWeight={"bold"} fontSize={30} color={"secondary.600"}>
                Customers
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box style={{ flex: 4 }}>
        <Box p={5} flex={1} justifyContent="center">
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() => navigation.navigate("ReadingScreen")}
          >
            <Box
              bg="tertiary.50"
              flex={1}
              justifyContent="center"
              alignItems="center"
              borderRadius={10}
            >
              <Octicons name="meter" size={40} color="#FB8500" />
              <Text fontWeight={"bold"} fontSize={30} color={"secondary.600"}>
                Readings
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem("userToken");
            dispatch(logoutUser());
          }}
        >
          <Text underline color={"secondary.700"}>
            Logout
          </Text>
        </TouchableOpacity>
        <Center><Text>{process.env.EXPO_PUBLIC_ENVIRONMENT=='development'?process.env.EXPO_PUBLIC_ENVIRONMENT:null}</Text></Center>
      </Box>
    </Box>
  );
};

export default HomeScreen;
