// CustomerDetailsScreen.js
import React, { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  useTheme,
  Icon,
  HStack,
  Pressable,
} from "native-base";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CollapsibleComponent from "../components/CollapsibleComponent";
import ReadingItem from "../components/ReadingItem";

const CustomerDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { customer } = route.params;

  return (
    <Box safeAreaTop flex={1} bg="background.50">
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
          <Box flex={1} p={1.5}>
            <Text fontSize={16} color={"white"}>
              {customer?.contact_name}
            </Text>
          </Box>
        </HStack>
      </Box>

      {/* Scrollable Section */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Box>
          <VStack space={1}>
            <HStack space={2} flex={1}>
              <Box>
                <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                  Name :
                </Text>
              </Box>
              <Box flex={1}>
                <Text
                  fontSize={16}
                  color={"tertiary.500"}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {customer?.contact_name}
                </Text>
              </Box>
            </HStack>
            <HStack space={2} flex={1}>
              <Box>
                <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                  Meter No. :
                </Text>
              </Box>
              <Box flex={1}>
                <Text
                  fontSize={16}
                  color={"tertiary.500"}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {customer?.meter_no}
                </Text>
              </Box>
            </HStack>
            <HStack space={2} flex={1}>
              <Box>
                <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                  Mobile No. :
                </Text>
              </Box>
              <Box flex={1}>
                <Text
                  fontSize={16}
                  color={"tertiary.500"}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {customer?.contact_phone}
                </Text>
              </Box>
            </HStack>
            <HStack space={2} flex={1}>
              <Box>
                <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                  Aadhar No. :
                </Text>
              </Box>
              <Box flex={1}>
                <Text
                  fontSize={16}
                  color={"tertiary.500"}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {customer?.aadhar_no}
                </Text>
              </Box>
            </HStack>
            <HStack space={2} flex={1}>
              <Box>
                <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                  Property  No. :
                </Text>
              </Box>
              <Box flex={1}>
                <Text
                  fontSize={16}
                  color={"tertiary.500"}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {customer?.aadhar_no}
                </Text>
              </Box>
            </HStack>
            <HStack space={2} flex={1}>
              <Box>
                <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                  Address :
                </Text>
              </Box>
              <Box flex={1}>
                <Text
                  fontSize={16}
                  color={"tertiary.500"}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {customer?.aadhar_no}
                </Text>
              </Box>
            </HStack>
            <HStack space={2} flex={1}>
              <Box>
                <Text fontSize={16} fontWeight={"bold"} color={"tertiary.700"}>
                  Group :
                </Text>
              </Box>
              <Box flex={1}>
                <Text
                  fontSize={16}
                  color={"tertiary.500"}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {customer?.group}
                </Text>
              </Box>
            </HStack>
            
          </VStack>
        </Box>
        <CollapsibleComponent title={"Reading History"}>
          <VStack space={4}>
            {customer?.readings && customer.readings.length
              ? customer.readings.map((reading) => {
                  return <ReadingItem reading={reading} />;
                })
              : null}
          </VStack>
        </CollapsibleComponent>
        <CollapsibleComponent title={"Bill History"}>
          <VStack space={4}></VStack>
        </CollapsibleComponent>
      </ScrollView>
    </Box>
  );
};

export default CustomerDetailsScreen;
