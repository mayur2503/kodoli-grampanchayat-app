import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Box,
  Text,
  HStack,
  Pressable,
  Icon,
  VStack,
  ScrollView,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


const CustomerScreen = () => {
  const navigation = useNavigation();
  
  return (
    <Box safeAreaTop bg="background.50" style={{ flex: 1 }}>
      <Box p={4} background={"background.700"}>
        <HStack alignItems="center" space={4}>
          <Box>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                as={<Ionicons name="arrow-back" />}
                size={7}
                color="white"
              />
            </Pressable>
          </Box>
          <Box flex={1}>
            <Text fontSize={20} color={"white"}>
              Customer
            </Text>
          </Box>
        </HStack>
      </Box>
      <ScrollView flex={1}>
        <VStack p={5} space={5}>
          <Box justifyContent="center">
            <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() => navigation.navigate("AddCustomer")}
            >
              <Box
                bg="tertiary.50"
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRadius={5}
                py={5}
              >
                {/* <Entypo name="users" size={40} color="#337d85" /> */}
                <Text fontWeight={"bold"} fontSize={24} color={"secondary.600"}>
                  Add Customer
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <Box justifyContent="center">
            <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() => navigation.navigate("SearchCustomer")}
            >
              <Box
                bg="tertiary.50"
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRadius={5}
                py={5}
              >
                {/* <Entypo name="users" size={40} color="#337d85" /> */}
                <Text fontWeight={"bold"} fontSize={24} color={"secondary.600"}>
                  Search Customer
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default CustomerScreen;
